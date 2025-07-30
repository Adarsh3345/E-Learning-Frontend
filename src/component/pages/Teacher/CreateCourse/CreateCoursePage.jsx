import React, { useEffect } from "react";
import CourseHeader from "./sub-components/CourseHeader";
import BasicInfo from "./sub-components/BasicInfo";
import PreviewCourseBox from "./sub-components/PreviewCourseBox";
import CourseSettings from "./sub-components/CourseSettings";
import OrganisationSettings from "./sub-components/OrganisationSettings";
import CourseContentSection from "./sub-components/CourseContentSection";
import { useCourseContext } from "../../../context/CourseContext";
import { useNavigate } from 'react-router-dom';

const CreateCoursePage = () => {
  const { course, updateCourse } = useCourseContext();
  const navigate = useNavigate();

  const handleEditContent = (sectionIndex) => {
    navigate(`/week/${sectionIndex}`);
  };

  // 🔍 For debugging
  useEffect(() => {
    console.log("Course updated:", course);
  }, [course]);

  const handleImageFileSelect = (file) => {
    updateCourse({
      course_image: file,
      imageUrl: URL.createObjectURL(file),
    });
  };

  return (
    <div className="min-h-screen w-full">
      <CourseHeader />
      <div className="flex flex-col lg:flex-row w-full gap-4 mt-6 mx-3">
        <div className="flex-1 flex flex-col gap-3 max-w-3xl">
          <BasicInfo
            name={course.name}
            setName={(name) => updateCourse({ name })}
            description={course.description}
            setDescription={(description) => updateCourse({ description })}
            imageUrl={course.imageUrl}
            setImageUrl={(imageUrl) => updateCourse({ imageUrl })}
            setCourseImageFile={handleImageFileSelect} // 📸 This now updates context directly
          />
          <CourseContentSection
            sections={course.sections}
            setSections={(sections) => updateCourse({ sections })}
            onEditContent={handleEditContent}
          />
        </div>

        <div className="w-full lg:w-96 flex flex-col space-y-4">
          <PreviewCourseBox />
          <CourseSettings
            durationValue={course.durationValue}
            setDurationValue={(durationValue) => updateCourse({ durationValue })}
            durationUnit={course.durationUnit}
            setDurationUnit={(durationUnit) => updateCourse({ durationUnit })}
            level={course.level}
            setLevel={(level) => updateCourse({ level })}
          />
          <OrganisationSettings
            university={course.university}
            setUniversity={(university) => updateCourse({ university })}
            specialisation={course.specialisation}
            setSpecialisation={(specialisation) => updateCourse({ specialisation })}
            tags={course.tags}
            setTags={(tags) => updateCourse({ tags })}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
