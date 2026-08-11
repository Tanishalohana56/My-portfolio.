import { motion } from "motion/react";
import { X, Printer, Mail, Linkedin, Github } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6" id="resume-modal-container">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm print:hidden"
      />

      {/* Modal Dialog container */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        className="relative bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col shadow-2xl print:h-auto print:max-w-none print:w-full print:border-none print:bg-white print:text-black print:shadow-none print:rounded-none"
        id="resume-modal-content"
      >
        {/* Top bar controls (Hidden when printing) */}
        <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex items-center justify-between print:hidden">
          <div className="space-y-0.5 text-left">
            <h3 className="font-display font-bold text-base text-white">Curriculum Vitae — Tanisha</h3>
            <p className="text-slate-400 text-xs font-sans">Official resume preview. Click print to save as PDF or view.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-sans font-semibold rounded-lg bg-pink-500 hover:bg-pink-600 text-white cursor-pointer transition-colors shadow-md shadow-pink-500/20"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV printable body - Replica of original CV */}
        <div className="p-6 sm:p-12 overflow-y-auto flex-grow bg-white text-black font-sans leading-relaxed print:overflow-visible print:p-0 print:m-0" id="cv-print-body">
          <div className="max-w-3xl mx-auto space-y-5 text-left text-black">
            
            {/* Header */}
            <div className="text-center space-y-1 pb-2">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-widest text-black uppercase">
                TANISHA
              </h1>
              <p className="text-sm font-sans text-gray-800 font-medium">
                Karachi, Pakistan
              </p>
              <div className="text-xs sm:text-sm text-gray-800 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 font-sans">
                <a href="mailto:tanulohana51@gmail.com" className="inline-flex items-center space-x-1 hover:underline text-blue-800">
                  <Mail className="w-3.5 h-3.5" />
                  <span>tanulohana51@gmail.com</span>
                </a>
                <span>|</span>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:underline text-blue-800">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span>|</span>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 hover:underline text-blue-800">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Summary
              </h2>
              <p className="text-xs sm:text-sm text-gray-900 leading-relaxed font-normal">
                Dedicated BS Computer Science undergraduate passionate about Artificial Intelligence, Machine Learning, Data Analysis, and Full-Stack Development. Driven to build innovative, user focused solutions and apply technology to solve real world challenges. Seeking opportunities to grow professionally while contributing to impactful and technology driven projects.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Education
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>DHA Suffa University, Karachi</span>
                    <span className="font-semibold">2023 – 2027</span>
                  </div>
                  <div className="text-gray-900">BS Computer Science</div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>Government Girls Degree College Mithi</span>
                    <span className="font-semibold">2020 – 2022</span>
                  </div>
                  <div className="text-gray-900">Pre-Medical</div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>Al Mehran Higher Secondary School Mithi</span>
                    <span className="font-semibold">2020</span>
                  </div>
                  <div className="text-gray-900">Matriculation, Science</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Skills
              </h2>
              <div className="space-y-1 text-xs sm:text-sm text-gray-900">
                <p>
                  <strong className="font-bold text-black">Web Development:</strong> HTML, CSS, React.js, Node.js, Express.js, REST APIs, Tailwind CSS, Responsive Design,Bootstrap
                </p>
                <p>
                  <strong className="font-bold text-black">Programming Languages:</strong> C, C++, Java, JavaScript
                </p>
                <p>
                  <strong className="font-bold text-black">Data Science / Analytics:</strong> Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Machine Learning, Power BI, Excel
                </p>
                <p>
                  <strong className="font-bold text-black">Tools Platforms:</strong> GitHub, VS Code, Vercel, Firebase, Supabase, Netlify, Lovable, Cursor, Google AI Studio, Google Antigravity,Docker
                </p>
                <p>
                  <strong className="font-bold text-black">Databases:</strong> SQL, MySQL, MongoDB, Firebase
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Experience
              </h2>
              
              <div className="space-y-3 text-xs sm:text-sm">
                {/* High Tech Software House */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>High Tech Software House</span>
                    <span className="font-semibold">2025</span>
                  </div>
                  <div className="font-medium text-gray-900">Frontend Developer Intern</div>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-900 pl-2">
                    <li>Developed responsive and user-friendly web pages using HTML, CSS, and JavaScript</li>
                    <li>Collaborated with the team to implement UI designs and improve website performance</li>
                    <li>Debugged and optimized frontend code to ensure cross-browser compatibility</li>
                  </ul>
                </div>

                {/* Nftcipher */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-black">
                    <span>Nftcipher</span>
                    <span className="font-semibold">Oct 2025 – Feb 2026</span>
                  </div>
                  <div className="font-medium text-gray-900">Data analyst and AI developer</div>
                  <ul className="list-disc list-inside space-y-0.5 text-gray-900 pl-2">
                    <li>Analyzed and processed data to generate insights and support decision-making</li>
                    <li>Designed and implemented machine learning models for AI-based solutions</li>
                    <li>Contributed to Frontend and Backend development for data-driven applications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-2.5 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Projects
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-black">Chat Application & Network Log Monitoring</h3>
                  <p className="text-gray-900 leading-normal">
                    Developed an interactive web-based network simulation and log monitoring tool to visualize Data Communication & Computer Networks concepts.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black">GreenVerse</h3>
                  <p className="text-gray-900 leading-normal">
                    Developed a responsive web application promoting environmental awareness and sustainable living with a modern, user-friendly interface.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2 pt-2">
              <h2 className="text-base sm:text-lg font-serif font-bold text-black border-b border-black pb-0.5">
                Certifications
              </h2>
              <div className="space-y-1 text-xs sm:text-sm text-gray-900">
                <div className="flex justify-between items-baseline">
                  <span>Completed IBM Data Science course on Coursera</span>
                  <span className="font-semibold">2025</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span>Completed Aptech Web Development course</span>
                  <span className="font-semibold">2025</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span>Completed Code in Place by Stanford University</span>
                  <span className="font-semibold">2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

