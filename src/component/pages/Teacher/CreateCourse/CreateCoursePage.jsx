import CourseHeader from "./sub-components/CourseHeader";
import BasicInfo from "./sub-components/BasicInfo";
import PreviewCourseBox from "./sub-components/PreviewCourseBox";
import CourseSettings from "./sub-components/CourseSettings";
import OrganisationSettings from "./sub-components/OrganisationSettings";
import CourseContentSection from "./sub-components/CourseContentSection";
const CreateCoursePage = () => (
  <div className="min-h-screen w-full">
    <CourseHeader />

    <div className="flex flex-col lg:flex-row w-full gap-4 mt-6 mx-3 ">
      
      <div className="flex-1 max-w-3xl">
        <BasicInfo />
        <CourseContentSection/>
      </div>

      <div className="w-full lg:w-96 flex flex-col space-y-4">
        <PreviewCourseBox />
        <CourseSettings />
        <OrganisationSettings />
      </div>

    </div>
  </div>
);

export default CreateCoursePage;
