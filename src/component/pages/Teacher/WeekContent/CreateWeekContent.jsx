import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ComponentSelector from './sub-components/ComponentSelector';
import CourseIntroSection from './sub-components/CourseIntroSection';
import TypographySettingsPanel from './sub-components/TypographySettingsPanel';
import MediaSettingsPanel from './sub-components/MediaSettingsPanel'; // New component
import SectionHeader from './sub-components/SectionHeader';

const CreateWeekContent = () => {
    const [components, setComponents] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const defaultSettings = {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 'Normal',
        textAlign: 'left',
        bold: false,
        italic: false,
        underline: false,
        color: '#000000',
    };

    const defaultMediaSettings = {
        alignment: 'center',
        width: '100%',
        borderSize: '0',
        borderColor: '#000000',
        borderRadius: '0',
        shadow: 'none',
    };

    const addComponent = (type) => {
        const newComponent = {
            id: uuidv4(),
            type,
            content: '',
            images: [],
            settings: (type === 'title' || type === 'para') ? { ...defaultSettings } : 
                    (type === 'image' || type === 'video' || type === 'gallery') ? { ...defaultMediaSettings } : {},
            options: type === 'quiz' ? ['', '', '', ''] : [],
        };

        setComponents([...components, newComponent]);
        setActiveIndex(components.length);
    };

    const updateComponent = (index, updates) => {
        const updatedComponents = [...components];
        updatedComponents[index] = {
            ...updatedComponents[index],
            ...updates
        };
        setComponents(updatedComponents);
    };

    const renderSettingsPanel = () => {
        if (activeIndex === null) return null;
        
        const activeComponent = components[activeIndex];
        
        if (activeComponent.type === 'title' || activeComponent.type === 'para') {
            return (
                <TypographySettingsPanel
                    settings={activeComponent.settings || {}}
                    onChange={(newSettings) =>
                        updateComponent(activeIndex, { settings: newSettings })
                    }
                />
            );
        }
        else if (activeComponent.type === 'image' || activeComponent.type === 'video' || activeComponent.type === 'gallery') {
            return (
                <MediaSettingsPanel
                    settings={activeComponent.settings || {}}
                    onChange={(newSettings) =>
                        updateComponent(activeIndex, { settings: newSettings })
                    }
                />
            );
        }
        
        return null;
    };

    return (
        <>
            <SectionHeader />
            <div className="flex min-h-screen">
                {/* Left Sidebar */}
                <div className="w-64 bg-white border-r p-4">
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
                            }}
                        />
                    </div>
                </div>

                {/* Right Sidebar - Settings Panel */}
                <div className="w-80 bg-white border-l p-4">
                    {renderSettingsPanel()}
                </div>
            </div>
        </>
    );
};

export default CreateWeekContent;