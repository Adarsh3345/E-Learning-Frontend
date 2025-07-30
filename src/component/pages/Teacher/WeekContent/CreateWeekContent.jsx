import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseContext } from '../../../context/CourseContext';
import { v4 as uuidv4 } from 'uuid';
import ComponentSelector from './sub-components/ComponentSelector';
import CourseIntroSection from './sub-components/CourseIntroSection';
import TypographySettingsPanel from './sub-components/TypographySettingsPanel';
import MediaSettingsPanel from './sub-components/MediaSettingsPanel';
import ListSettingsPanel from './sub-components/ListSettingsPanel';
import AttachmentSettingsPanel from './sub-components/AttachmentSettingsPanel';
import TableTypographySettingsPanel from './sub-components/TableTypographySettingsPanel';
import SectionHeader from './sub-components/SectionHeader';

const CreateWeekContent = () => {
  const { sectionIndex } = useParams();
  const navigate = useNavigate();
  const { weekContent, updateWeekContent, course, updateCourse } = useCourseContext();

  // Always extract the array
  const sectionObj = weekContent.components?.[sectionIndex] || {};
  const [components, setComponents] = useState(sectionObj.components || []);
  const [activeIndex, setActiveIndex] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Sync with context
  useEffect(() => {
    const sectionObj = weekContent.components?.[sectionIndex] || {};
    setComponents(sectionObj.components || []);
  }, [weekContent.components, sectionIndex]);

  const handleExit = () => {
    navigate(-1); // Go back to course page
  };

  const handlePreview = () => {
    console.log("Previewing section:", components);
    // In a real app, this would open a preview modal or navigate to preview page
    alert("Preview functionality would show a preview of this section");
  };

  // Save only this week's components
  const handleSave = () => {
    updateWeekContent(sectionIndex, components);
    setLastSaved(new Date());
    console.log("✅ Week content saved to context");
  };

  const defaultSettings = {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    listStyle: 'bullet',
    customIcon: null
  };

  const defaultMediaSettings = {
    alignment: 'center',
    width: '100%',
    borderSize: '0',
    borderColor: '#000000',
    borderRadius: '0',
    shadow: 'none',
  };

  const defaultAttachmentSettings = {
    thumbWidth: '100px',
    thumbHeight: 'auto',
    thumbBorderSize: '0',
    thumbBorderColor: '#000000',
    thumbBorderRadius: '0',
    descFontSize: 14,
    descColor: '#000000',
    descTextAlign: 'left',
    descFontWeight: 'normal'
  };

  const defaultTableSettings = {
    fontSize: 14,
    fontWeight: 'normal',
    textColor: '#000000',
    fontFamily: 'Inter',
    textAlign: 'center',
    cellBgColor: '#ffffff',
    tableBgColor: '#f8f8f8',
    italic: false,
    underline: false,
    bold: false,
    borderSize: '1px',
    borderColor: '#000000',
    borderRadius: '0'
  };

  const addComponent = (type) => {
    const baseComponent = {
      id: uuidv4(),
      type,
      content: '',
      images: [],
      settings: {},
      options: type === 'quiz' ? ['', '', '', ''] : [],
    };

    if (type === 'title' || type === 'para' || type === 'link') {
      baseComponent.settings = { ...defaultSettings };
    } else if (type === 'image' || type === 'video' || type === 'gallery') {
      baseComponent.settings = { ...defaultMediaSettings };
    } else if (type === 'list') {
      baseComponent.settings = { ...defaultSettings };
      baseComponent.items = [{ text: '', link: '' }];
    } else if (type === 'attachment') {
      baseComponent.settings = { ...defaultAttachmentSettings };
    } else if (type === 'table') {
      baseComponent.rows = 2;
      baseComponent.cols = 2;
      baseComponent.settings = { ...defaultTableSettings };
      baseComponent.selectedRow = 0;
      baseComponent.selectedCol = 0;
    }

    const newComponents = [...components, baseComponent];
    setComponents(newComponents);
    setActiveIndex(newComponents.length - 1);
    updateWeekContent(sectionIndex, newComponents); 
  };

  const updateComponent = (index, updates) => {
    setComponents(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      updateWeekContent(sectionIndex, updated); // <-- Save to context immediately

      // If this is a title component, update the course.sections array
      if (updated[index].type === "title") {
        const newTitle = updates.content !== undefined ? updates.content : updated[index].content;
        if (typeof newTitle === "string") {
          const newSections = [...course.sections];
          newSections[sectionIndex] = newTitle;
          updateCourse({ sections: newSections });
        }
      }

      return updated;
    });
  };

  const renderSettingsPanel = () => {
    if (activeIndex === null || !components[activeIndex]) return null;

    const activeComponent = components[activeIndex];

    switch (activeComponent.type) {
      case 'title':
      case 'para':
      case 'link':
        return (
          <TypographySettingsPanel
            settings={activeComponent.settings || {}}
            onChange={(newSettings) =>
              updateComponent(activeIndex, { settings: newSettings })
            }
          />
        );

      case 'image':
      case 'video':
      case 'gallery':
        return (
          <MediaSettingsPanel
            settings={activeComponent.settings || {}}
            onChange={(newSettings) =>
              updateComponent(activeIndex, { settings: newSettings })
            }
          />
        );

      case 'list':
        return (
          <ListSettingsPanel
            settings={activeComponent.settings || {}}
            onChange={(newSettings) =>
              updateComponent(activeIndex, { settings: newSettings })
            }
          />
        );

      case 'attachment':
        return (
          <AttachmentSettingsPanel
            settings={activeComponent.settings || {}}
            onChange={(newSettings) =>
              updateComponent(activeIndex, { settings: newSettings })
            }
          />
        );

      case 'table':
        return (
          <TableTypographySettingsPanel
            settings={activeComponent.settings || {}}
            onChange={(newSettings) =>
              updateComponent(activeIndex, { settings: newSettings })
            }
          />
        );

      default:
        return null;
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return "Not saved yet";
    
    const now = new Date();
    const diffMinutes = Math.floor((now - lastSaved) / 60000);
    
    if (diffMinutes < 1) return "just now";
    if (diffMinutes === 1) return "1 min ago";
    return `${diffMinutes} mins ago`;
  };

  const sectionTitle = (course.sections && course.sections[sectionIndex]) || `Week ${parseInt(sectionIndex) + 1}`;

  return (
    <div className="flex flex-col h-screen">
      <SectionHeader 
        title={sectionTitle}
        onExit={handleExit} 
        onPreview={handlePreview}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r p-4 overflow-y-auto">
          <ComponentSelector onSelect={addComponent} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create Week Content</h1>

            <CourseIntroSection
              components={components}
              onUpdate={updateComponent}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onRemove={(index) => {
                const updated = components.filter((_, i) => i !== index);
                setComponents(updated);
                setActiveIndex(null);
                updateWeekContent(sectionIndex, updated); 
              }}
              sectionIndex={sectionIndex} 
            />
          </div>
        </div>
        
        <div className="w-80 bg-white border-l p-4 overflow-y-auto">
          {renderSettingsPanel()}
        </div>
      </div>
    </div>
  );
};

export default CreateWeekContent;