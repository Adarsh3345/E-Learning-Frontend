import React, { createContext, useState, useContext, useCallback,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(() => {
    const id = uuidv4();
    return {
      id,
      name: "Beginner's Guide to Successful Company Management: Business and User Goals",
      description: "Hello Student! 🙌 Economics isn't just a subject - it's the lens through which we view society...",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0", 
      course_image: null, 
      sections: [],
      weekIds: [],
      durationValue: '',
      durationUnit: 'weeks',
      level: 'Beginner',
      university: "Any university",
      specialisation: "Business",
      tags: ["Business", "Economics", "Success", "CIO", "Goals", "Management", "Company"],
    };
  });

  useEffect(() => {
    console.log(course);
  }, [course]);

  const [weekContent, setWeekContent] = useState({
    activeSection: null,
    components: [],
  });

  const [quizzes, setQuizzes] = useState({});
  const [bulkTime, setBulkTime] = useState('No time limits');
  const [bulkPoints, setBulkPoints] = useState('0 points');

  const updateCourse = (updates) => {
    setCourse(prev => {
      // If updating course_image (File), generate preview URL too
      let previewUrl = prev.imageUrl;

      if (updates.course_image instanceof File) {
        previewUrl = URL.createObjectURL(updates.course_image);
      }

      return {
        ...prev,
        ...updates,
        imageUrl: updates.imageUrl || previewUrl
      };
    });
  };

  const updateWeekContent = useCallback((sectionIndex, components) => {
    setWeekContent(prev => {
      const updatedComponents = [...(prev.components || [])];
      let weekObj = updatedComponents[sectionIndex];

      if (!weekObj) {
        weekObj = {
          weekId: uuidv4(),
          courseId: course.id,
          components: [],
          quizIds: [],
        };
      }

      const quizIds = [];
      components.forEach(comp => {
        if (comp.type === 'quiz' && Array.isArray(comp.quizzes)) {
          comp.quizzes.forEach(q => {
            if (q.quizId) quizIds.push(q.quizId);
          });
        }
      });

      weekObj = {
        ...weekObj,
        courseId: course.id,
        components,
        quizIds,
      };

      updatedComponents[sectionIndex] = weekObj;

      setCourse(prevCourse => {
        const weekIds = updatedComponents.map(w => w?.weekId).filter(Boolean);
        return { ...prevCourse, weekIds };
      });

      return {
        ...prev,
        activeSection: sectionIndex,
        components: updatedComponents,
      };
    });
  }, [course.id]);

  const updateQuiz = useCallback((sectionIndex, componentIndex, quizIndex, quizData) => {
    setWeekContent(prev => {
      const updatedComponents = [...(prev.components || [])];
      let weekObj = updatedComponents[sectionIndex];

      if (!weekObj) {
        weekObj = {
          weekId: uuidv4(),
          courseId: course.id,
          components: [],
          quizIds: [],
        };
        updatedComponents[sectionIndex] = weekObj;
      }

      const componentsArr = [...(weekObj.components || [])];
      if (!componentsArr[componentIndex]) {
        componentsArr[componentIndex] = { type: 'quiz', quizzes: [] };
      }

      const quizId = quizData.quizId || uuidv4();
      const quizWithIds = {
        ...quizData,
        quizId,
        weekId: weekObj.weekId,
        courseId: course.id
      };

      const component = { ...componentsArr[componentIndex] };
      const quizzesArr = [...(component.quizzes || [])];

      if (quizIndex >= quizzesArr.length) {
        quizzesArr.push(quizWithIds);
      } else {
        quizzesArr[quizIndex] = quizWithIds;
      }

      component.quizzes = quizzesArr;
      componentsArr[componentIndex] = component;

      const allQuizIds = new Set(weekObj.quizIds || []);
      allQuizIds.add(quizId);
      weekObj = {
        ...weekObj,
        components: componentsArr,
        quizIds: Array.from(allQuizIds),
      };

      updatedComponents[sectionIndex] = weekObj;

      setCourse(prevCourse => {
        const weekIds = updatedComponents.map(w => w?.weekId).filter(Boolean);
        return { ...prevCourse, weekIds };
      });

      setQuizzes(prevQuizzes => ({
        ...prevQuizzes,
        [quizId]: quizWithIds,
      }));

      return {
        ...prev,
        components: updatedComponents,
      };
    });
  }, [course.id]);

  const getAllQuizzes = useCallback(() => {
    return Object.values(quizzes);
  }, [quizzes]);

  return (
    <CourseContext.Provider
      value={{
        course,
        updateCourse,
        weekContent,
        updateWeekContent,
        quizzes,
        updateQuiz,
        getAllQuizzes,
        bulkTime,
        setBulkTime,
        bulkPoints,
        setBulkPoints,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
