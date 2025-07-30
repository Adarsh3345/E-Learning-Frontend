import React from "react";
import {
  Video,
  Download,
  Smartphone,
  FileText,
  Clock,
  Users,
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Share2
} from "lucide-react";

const CourseIncludesCard = () => {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm w-full">
      <h3 className="text-md font-semibold mb-4 text-gray-800">This course includes</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li className="flex items-center space-x-2">
          <Video className="w-4 h-4 text-gray-500" />
          <span>65 hours on demand video</span>
        </li>
        <li className="flex items-center space-x-2">
          <Download className="w-4 h-4 text-gray-500" />
          <span>45 downloadable resources</span>
        </li>
        <li className="flex items-center space-x-2">
          <Smartphone className="w-4 h-4 text-gray-500" />
          <span>Access on mobile and TV</span>
        </li>
        <li className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>86 articles</span>
        </li>
        <li className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>30 min personal weekly session</span>
        </li>
        <li className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span>Meeting with Oxford Professor</span>
        </li>
        <li className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-gray-500" />
          <span>Certificate of completion</span>
        </li>
      </ul>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Share this course</h4>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors"
            aria-label="More sharing options"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CourseIncludesCard;
