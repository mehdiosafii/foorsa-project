
import React, { useState, useEffect } from 'react';
import { OFFER_DATA } from './data';
import { ScholarshipType, Campus, UniversityOffer } from './types';
import { 
  MapPin, 
  Clock, 
  Award, 
  CheckCircle2, 
  Building2, 
  Globe,
  FileText,
  Star,
  GraduationCap,
  Pencil,
  Printer,
  Undo,
  Download,
  Coins,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

// --- Editable Component ---

interface EditableTextProps {
  value: string | number;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onChange, 
  isEditing, 
  className = "", 
  tag: Tag = 'span',
  multiline = false
}) => {
  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    onChange(e.currentTarget.textContent || "");
  };

  if (!isEditing) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(value)) }} />;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleInput}
      className={`${className} editable-highlight cursor-text min-w-[20px] inline-block empty:before:content-['Type_here...'] empty:before:text-gray-500`}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(value)) }}
    />
  );
};

// --- Sub Components ---

const LogoHeader = () => (
  <div className="flex flex-col items-center justify-center py-12 border-b border-white/10 print:py-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-6xl font-black tracking-wider uppercase font-arabic mb-2 text-white print:text-black print:mix-blend-difference">لقى راسك</h1>
      <span className="text-sm md:text-base font-bold tracking-[0.5em] text-brand-gold uppercase print:text-black">Find Yourself</span>
    </motion.div>
  </div>
);

const DocumentTitle: React.FC<{ 
  data: UniversityOffer; 
  isEditing: boolean; 
  onUpdate: (field: keyof UniversityOffer, value: any) => void;
}> = ({ data, isEditing, onUpdate }) => (
  <section className="py-12 text-center relative overflow-hidden print:py-6">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -z-10 print:hidden"></div>
    
    <EditableText 
      tag="h2"
      isEditing={isEditing}
      value={data.name}
      onChange={(v) => onUpdate('name', v)}
      className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl mx-auto leading-tight"
    />
    
    <div className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto print:text-gray-400 leading-relaxed">
      Official admission offer for the <span className="text-brand-gold font-semibold print:text-black inline-block">
        <EditableText 
          isEditing={isEditing} 
          value={data.degreeLevel} 
          onChange={(v) => onUpdate('degreeLevel', v)}
        />
      </span> program in <span className="text-white font-semibold print:text-black inline-block">
        <EditableText 
          isEditing={isEditing} 
          value={data.program} 
          onChange={(v) => onUpdate('program', v)}
        />
      </span>.
    </div>

    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm print:text-black">
      <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
        <Award size={16} className="text-brand-gold print:text-black" />
        <EditableText isEditing={isEditing} value={data.ranking} onChange={(v) => onUpdate('ranking', v)} />
      </div>
      <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
        <MapPin size={16} className="text-brand-gold print:text-black" />
        <EditableText isEditing={isEditing} value={data.location} onChange={(v) => onUpdate('location', v)} />
      </div>
      <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
        <Clock size={16} className="text-brand-gold print:text-black" />
        <EditableText isEditing={isEditing} value={data.duration} onChange={(v) => onUpdate('duration', v)} />
      </div>
      <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
        <GraduationCap size={16} className="text-brand-gold print:text-black" />
        <EditableText isEditing={isEditing} value={data.degreeLevel} onChange={(v) => onUpdate('degreeLevel', v)} />
      </div>
    </div>
  </section>
);

const ScholarshipCard: React.FC<{ 
  data: ScholarshipType; 
  index: number;
  isEditing: boolean;
  onUpdate: (newData: ScholarshipType) => void;
}> = ({ data, index, isEditing, onUpdate }) => (
  <div 
    className={`group relative p-6 rounded-xl border transition-all duration-300 break-inside-avoid ${
      data.highlight 
        ? 'bg-brand-gold/10 border-brand-gold/50 print:bg-gray-100 print:border-black' 
        : 'bg-white/5 border-white/10 print:border-gray-300'
    }`}
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <EditableText 
            tag="h3"
            isEditing={isEditing}
            value={data.type}
            onChange={(v) => onUpdate({...data, type: v})}
            className={`text-lg font-bold ${data.highlight ? 'text-brand-gold print:text-black' : 'text-white print:text-black'}`}
          />
          {data.highlight && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-gold text-black rounded uppercase tracking-wide print:border print:border-black">
              Top Tier
            </span>
          )}
        </div>
        <div className="text-gray-300 text-sm mb-2 print:text-gray-700">
           <EditableText 
            isEditing={isEditing}
            value={data.coverage}
            onChange={(v) => onUpdate({...data, coverage: v})}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} />
           <EditableText 
            isEditing={isEditing}
            value={data.duration}
            onChange={(v) => onUpdate({...data, duration: v})}
          />
        </div>
      </div>
      
      <div className="md:text-right border-t md:border-t-0 border-white/10 pt-4 md:pt-0 mt-4 md:mt-0 print:border-gray-300">
        <p className="text-xs text-gray-500 uppercase mb-1">Student Pays</p>
        <div className={`text-xl font-mono font-bold ${data.costAfterScholarship.includes('0 RMB') ? 'text-green-400 print:text-black' : 'text-white print:text-black'}`}>
           <EditableText 
            isEditing={isEditing}
            value={data.costAfterScholarship}
            onChange={(v) => onUpdate({...data, costAfterScholarship: v})}
          />
        </div>
      </div>
    </div>
  </div>
);

const CampusCard: React.FC<{ 
  campus: Campus; 
  isEditing: boolean;
  onUpdate: (newCampus: Campus) => void;
}> = ({ campus, isEditing, onUpdate }) => (
  <div className="bg-brand-gray rounded-2xl overflow-hidden border border-white/10 break-inside-avoid print:border-gray-300 print:bg-transparent">
    <div className="relative h-48 overflow-hidden group">
      <img 
        src={campus.images[0]} 
        alt={campus.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 print:grayscale print:contrast-125" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80 print:hidden"></div>
      <div className="absolute bottom-4 left-4 right-4 print:text-black print:static print:mt-4 print:px-4">
        <EditableText 
          tag="h3"
          isEditing={isEditing}
          value={campus.name}
          onChange={(v) => onUpdate({...campus, name: v})}
          className="text-xl font-bold text-white mb-1 print:text-black"
        />
        <div className="flex items-center gap-2 text-brand-gold text-xs uppercase tracking-wider print:text-black">
          <MapPin size={12} />
          <EditableText 
            isEditing={isEditing}
            value={campus.location}
            onChange={(v) => onUpdate({...campus, location: v})}
          />
        </div>
      </div>
    </div>
    
    <div className="p-6 print:pt-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-white/10 print:border-gray-300">
            <th className="pb-3 font-medium text-left">Room</th>
            <th className="pb-3 font-medium text-right">RMB</th>
            <th className="pb-3 font-medium text-right">MAD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 print:divide-gray-300">
          {campus.housing.map((h, i) => (
            <tr key={i}>
              <td className="py-3 text-gray-300 print:text-black">
                {h.occupancy} Person Shared
              </td>
              <td className="py-3 text-right font-mono text-gray-400 print:text-black">
                <EditableText 
                  isEditing={isEditing}
                  value={h.priceRmb}
                  onChange={(v) => {
                    const newHousing = [...campus.housing];
                    newHousing[i] = { ...h, priceRmb: Number(v) || 0 };
                    onUpdate({ ...campus, housing: newHousing });
                  }}
                />
              </td>
              <td className="py-3 text-right font-mono font-bold text-white print:text-black">
                <EditableText 
                  isEditing={isEditing}
                  value={h.priceMad}
                  onChange={(v) => {
                    const newHousing = [...campus.housing];
                    newHousing[i] = { ...h, priceMad: Number(v) || 0 };
                    onUpdate({ ...campus, housing: newHousing });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4 break-after-avoid print:border-black">
    <div className="p-2 bg-white/10 rounded-lg print:bg-transparent print:border print:border-black">
      <Icon size={20} className="text-brand-gold print:text-black" />
    </div>
    <h2 className="text-2xl font-bold tracking-tight text-white print:text-black">{title}</h2>
  </div>
);

const Toolbar: React.FC<{ 
  isEditing: boolean; 
  toggleEdit: () => void; 
  onPrint: () => void;
  onReset: () => void;
}> = ({ isEditing, toggleEdit, onPrint, onReset }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-white/10 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl shadow-black z-50 no-print">
    <button 
      onClick={toggleEdit}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
        isEditing 
          ? 'bg-brand-gold text-black hover:bg-yellow-400' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      <Pencil size={16} />
      {isEditing ? 'Done Editing' : 'Edit Document'}
    </button>

    <div className="w-px h-6 bg-white/20 mx-1"></div>

    <button 
      onClick={onReset}
      className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      title="Reset Changes"
    >
      <Undo size={18} />
    </button>

    <button 
      onClick={onPrint}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all group"
      title="Generates a PDF via Print Dialog"
    >
      <Download size={16} className="group-hover:scale-110 transition-transform" />
      Save as PDF
    </button>
  </div>
);

// --- Main Layout ---

const App: React.FC = () => {
  const [offerData, setOfferData] = useState<UniversityOffer>(OFFER_DATA);
  const [isEditing, setIsEditing] = useState(false);

  // Reset handler
  const handleReset = () => {
    if (window.confirm("Reset all changes to default?")) {
      setOfferData(OFFER_DATA);
    }
  };

  // Print handler
  const handlePrint = () => {
    // 1. Disable editing mode first
    setIsEditing(false);
    
    // 2. Wait for state update and DOM reflow (crucial for removing edit markers)
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Generic update handler
  const updateField = (field: keyof UniversityOffer, value: any) => {
    setOfferData(prev => ({ ...prev, [field]: value }));
  };

  // Scholarship update handler
  const updateScholarship = (index: number, newData: ScholarshipType) => {
    const newScholarships = [...offerData.scholarships];
    newScholarships[index] = newData;
    setOfferData(prev => ({ ...prev, scholarships: newScholarships }));
  };

  // Campus update handler
  const updateCampus = (index: number, newCampus: Campus) => {
    const newCampuses = [...offerData.campuses];
    newCampuses[index] = newCampus;
    setOfferData(prev => ({ ...prev, campuses: newCampuses }));
  };

  // Requirements update handler (generic for string arrays)
  const updateRequirement = (category: 'english' | 'documents' | 'other', index: number, value: string) => {
    const newReqs = { ...offerData.requirements };
    newReqs[category] = [...newReqs[category]];
    newReqs[category][index] = value;
    setOfferData(prev => ({ ...prev, requirements: newReqs }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-brand-gold selection:text-black pb-20 print:bg-[#0a0a0a] print:pb-0">
      
      {/* Main Document Container - Targeted by Print CSS */}
      <div id="printable-document" className="max-w-4xl mx-auto bg-[#0a0a0a] min-h-screen shadow-2xl shadow-black border-x border-white/5 print:border-none print:shadow-none print:w-full print:max-w-none">
        
        <LogoHeader />
        
        <main className="px-6 md:px-12 print:px-8">
          <DocumentTitle 
            data={offerData} 
            isEditing={isEditing} 
            onUpdate={updateField} 
          />

          <div className="space-y-16 py-8 print:space-y-8">
            
            {/* Scholarships Section */}
            <section className="break-inside-avoid">
              <SectionTitle title="Scholarship Opportunities" icon={GraduationCap} />
              <div className="flex flex-col gap-4">
                {offerData.scholarships.map((sch, idx) => (
                  <ScholarshipCard 
                    key={idx} 
                    data={sch} 
                    index={idx} 
                    isEditing={isEditing}
                    onUpdate={(newData) => updateScholarship(idx, newData)}
                  />
                ))}
              </div>
            </section>

            {/* Housing Section */}
            <section className="break-inside-avoid">
              <SectionTitle title="Campus & Accommodation" icon={Building2} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offerData.campuses.map((campus, idx) => (
                  <CampusCard 
                    key={idx} 
                    campus={campus} 
                    isEditing={isEditing}
                    onUpdate={(newCampus) => updateCampus(idx, newCampus)}
                  />
                ))}
              </div>
            </section>

            {/* Requirements Section */}
            <section className="break-inside-avoid">
              <SectionTitle title="Requirements & Process" icon={FileText} />
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 print:border-gray-300 print:bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  
                  <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider print:text-black">
                      <Globe size={14} className="text-brand-gold print:text-black" /> Language Proficiency
                    </h4>
                    <div className="space-y-3">
                      {offerData.requirements.english.map((req, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-black/20 rounded border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 print:bg-black"></div>
                          <EditableText 
                            isEditing={isEditing}
                            value={req}
                            onChange={(v) => updateRequirement('english', i, v)}
                            className="text-sm font-medium"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider print:text-black">
                      <CheckCircle2 size={14} className="text-brand-gold print:text-black" /> Key Documents
                    </h4>
                    <ul className="space-y-3">
                      {offerData.requirements.documents.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400 print:text-black">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 print:bg-black"></span>
                          <EditableText 
                            isEditing={isEditing}
                            value={req}
                            onChange={(v) => updateRequirement('documents', i, v)}
                          />
                        </li>
                      ))}
                      {offerData.requirements.other.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-brand-gold/80 print:text-black">
                          <Star size={12} className="mt-1 fill-brand-gold/20 print:fill-black" />
                          <EditableText 
                            isEditing={isEditing}
                            value={req}
                            onChange={(v) => updateRequirement('other', i, v)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* New Admissions Essentials Block */}
                <div className="pt-8 border-t border-white/10 print:border-gray-300">
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider print:text-black">
                      <FileCheck size={14} className="text-brand-gold print:text-black" /> Admissions Essentials
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
                         <div className="flex items-center gap-2 text-sm text-gray-400 print:text-black">
                            <Coins size={16} />
                            <span>Application Fee:</span>
                         </div>
                         <div className="font-mono font-bold text-white print:text-black">
                           <EditableText 
                              isEditing={isEditing}
                              value={offerData.applicationFee}
                              onChange={(v) => updateField('applicationFee', v)}
                            />
                         </div>
                      </div>
                       <div className="flex items-center justify-between p-4 bg-black/20 rounded border border-white/5 print:bg-transparent print:border-gray-300 print:text-black">
                         <div className="flex items-center gap-2 text-sm text-gray-400 print:text-black">
                            <FileText size={16} />
                            <span>CSCA Test Required:</span>
                         </div>
                         <div className="font-mono font-bold text-white print:text-black">
                           <EditableText 
                              isEditing={isEditing}
                              value={offerData.cscaTestRequired}
                              onChange={(v) => updateField('cscaTestRequired', v)}
                            />
                         </div>
                      </div>
                    </div>
                </div>
              </div>
            </section>

            {/* Updated Footer (Button Removed) */}
            <section className="py-8 text-center border-t border-white/10 break-inside-avoid print:border-gray-300">
              <p className="text-gray-500 text-sm print:text-black">
                This document is a representation of the offer details for the 2024/2025 academic year. <br />
                Please contact your admissions advisor for final verification.
              </p>
            </section>

          </div>
        </main>

        {/* Document Footer */}
        <div className="bg-[#050505] py-8 text-center border-t border-white/5 print:bg-transparent print:border-gray-300">
          <p className="text-xs text-gray-600 font-mono print:text-black">REF: BIT-2024-AE-OFFER</p>
        </div>

      </div>

      <Toolbar 
        isEditing={isEditing} 
        toggleEdit={() => setIsEditing(!isEditing)} 
        onPrint={handlePrint}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
