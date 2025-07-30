import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCourseContext } from "../../../../context/CourseContext";

const CourseHeader = () => {
  const navigate = useNavigate();
  const { course, weekContent, getAllQuizzes, updateCourse } = useCourseContext();
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // 📦 Upload file to backend
  const uploadFile = async (fileBlob) => {
    const formData = new FormData();
    formData.append("file", fileBlob, "file");

    const res = await fetch("http://127.0.0.1:5000/upload-file", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "File upload failed");

    return `http://127.0.0.1:5000/file/${data.file_id}`;
  };

  // 🧠 Replace blob URLs with uploaded file URLs
  const processBlock = async (block) => {
    if (block.type === "image" && block.images?.[0]?.startsWith("blob:")) {
      const blob = await fetch(block.images[0]).then(res => res.blob());
      const uploadedUrl = await uploadFile(blob);
      return { ...block, images: [uploadedUrl] };
    }

    if (block.type === "gallery") {
      const newImages = await Promise.all(
        block.images.map(async (img) => {
          if (img.startsWith("blob:")) {
            const blob = await fetch(img).then(res => res.blob());
            return await uploadFile(blob);
          }
          return img;
        })
      );
      return { ...block, images: newImages };
    }

    if (block.type === "video" && block.url?.startsWith("blob:")) {
      const blob = await fetch(block.url).then(res => res.blob());
      const uploadedUrl = await uploadFile(blob, "video.mp4");
      return { ...block, url: uploadedUrl };
    }

    if (block.type === "attachment") {
      const newAttachments = await Promise.all(
        (Array.isArray(block.attachments) ? block.attachments : []).map(async (file) => {
          if (file?.url?.startsWith("blob:")) {
            const blob = await fetch(file.url).then(res => res.blob());
            const uploadedUrl = await uploadFile(blob);
            return { ...file, url: uploadedUrl };
          }
          return file;
        })
      );
   
      return { 
        ...block, 
        attachments: newAttachments,
        settings: {
          thumbBorderSize: block.settings?.thumbBorderSize || '0',
          thumbBorderColor: block.settings?.thumbBorderColor || '#000000',
          thumbBorderRadius: block.settings?.thumbBorderRadius || '0',
          descFontSize: block.settings?.descFontSize || 14,
          descColor: block.settings?.descColor || '#000000',
          descTextAlign: block.settings?.descTextAlign || 'left',
          descFontWeight: block.settings?.descFontWeight || 'normal',
          ...block.settings
        }
      };
    }

    return block;
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      // Step 1: Save Course
      const formData = new FormData();
      formData.append("teacher_id", user?.role === "teacher" ? user.id : "Guest Teacher");
      formData.append("name", course.name || "");
      formData.append("description", course.description || "");
      formData.append("level", course.level || "");
      formData.append("durationValue", course.durationValue || "");
      formData.append("durationUnit", course.durationUnit || "");
      formData.append("university", course.university || "");
      formData.append("specialisation", course.specialisation || "");
      formData.append("course_review", course.course_review || 0);
      (course.tags || []).forEach(tag => formData.append("tags[]", tag));
      if (course.course_image instanceof File) {
        formData.append("course_image", course.course_image);
      }

      const courseRes = await fetch("http://127.0.0.1:5000/api/courses", {
        method: "POST",
        body: formData,
      });

      const courseData = await courseRes.json();
      if (!courseRes.ok) throw new Error(courseData.error || "Failed to create course");
      const course_id = courseData.course_id;
      updateCourse({ id: course_id });

      // Step 2: Save Weeks
      const weekIdMap = {};
      const courseContentIds = [];

      const weekSaves = (weekContent.components || []).filter(Boolean).map(async (week) => {
        // Process all blocks including attachments
        const modifiedComponents = await Promise.all(
          (week.components || []).map(block => processBlock(block))
        );

        const weekPayload = {
          course_id,
          course_content_components: modifiedComponents,
          quiz_ids: [],
          header_paragraph_style: {
            font_family: "Arial",
            font_size: "16px",
            font_weight: "normal",
            italic: false,
            underline: false,
            color: "#000000",
          },
          media_style: {
            alignment: "center",
            width: "100%",
            border_thickness: "0px",
            border_color: "#000000",
            border_radius: "0px",
          },
          course_content_attachment: {
            style: {
              border_thickness: "0px",
              border_color: "#000000",
              border_radius: "0px",
              desc_text_size: "14px",
              desc_text_color: "#000000",
              desc_text_align: "left",
            },
          },
          course_content_table: {
            style: {
              font_family: "Arial",
              font_size: "14px",
              text_color: "#000000",
              border_thickness: "1px",
              border_color: "#cccccc",
              border_radius: "0px",
              bg_color: "#ffffff",
            },
          },
        };

        const res = await fetch("http://127.0.0.1:5000/api/course-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(weekPayload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save week");

        weekIdMap[week.weekId] = data.course_content_id;
        courseContentIds.push(data.course_content_id);
        return data;
      });

      await Promise.all(weekSaves);

      // Step 3: Save Quizzes
      const allQuizzes = getAllQuizzes();
      const seenQuizIds = new Set();
      const uniqueQuizzes = [];

      for (const quiz of allQuizzes) {
        if (!seenQuizIds.has(quiz.quizId)) {
          seenQuizIds.add(quiz.quizId);
          uniqueQuizzes.push(quiz);
        }
      }

      const quizSaves = uniqueQuizzes.map(async (quiz) => {
        const totalPoints = quiz.questions?.reduce((sum, q) => sum + (q.points || 0), 0) || 0;
        const backendWeekId = weekIdMap[quiz.weekId];

        const quizPayload = {
          quiz_id: quiz.quizId,
          course_id,
          week_id: backendWeekId,
          quiz_name: quiz.title,
          quiz_description: quiz.description,
          quiz_total_time: quiz.quiz_total_time || 0,
          quiz_total_points: totalPoints,
          quiz_questions: quiz.questions || [],
        };

        const res = await fetch("http://127.0.0.1:5000/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quizPayload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create quiz");

        return data;
      });

      await Promise.all(quizSaves);

      // Step 4: PATCH course with all content IDs
      await fetch(`http://127.0.0.1:5000/api/courses/${course_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_content_id: courseContentIds }),
      });

      alert("Course saved successfully!");
      navigate(`/course/${course_id}`);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving course. " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div>
        <p className="text-sm text-gray-400 space-x-1">
          <span className="cursor-pointer hover:underline">Your classroom</span> /
          <span className="cursor-pointer hover:underline ml-1">Your courses</span> /
          <span className="font-semibold ml-1 text-gray-700">
            {course.name || "Create Course"}
          </span>
        </p>
        <h1 className="text-2xl font-bold mt-2 text-gray-900">
          {course.name || "Create Course"}
        </h1>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCancel}
          className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-5 py-2 text-white font-semibold rounded-md ${
            isSaving ? "bg-gray-400" : "bg-purple-300 hover:bg-purple-400"
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CourseHeader;