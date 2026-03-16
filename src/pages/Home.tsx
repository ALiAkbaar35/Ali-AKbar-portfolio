import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDown, 
  Code2, 
  Database, 
  Server, 
  TerminalSquare, 
  Wrench,
  BrainCircuit,
  Trophy,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CanvasBackground } from '@/components/CanvasBackground';
import { Typewriter } from '@/components/Typewriter';
import { TiltCard } from '@/components/TiltCard';
import { Section } from '@/components/Section';
import { Navbar } from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } catch {
      setIsSubmitting(false);
      toast({
        title: "Message Not Sent",
        description: "Something went wrong. Please try again in a moment.",
      });
    }
  };

  return (
    <div className="relative w-full bg-background min-h-screen selection:bg-primary/30 selection:text-primary">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <CanvasBackground />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 text-primary mb-8 text-sm font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Available for new opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight">
              Hi, I'm <br className="md:hidden" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] bg-clip-text text-transparent pb-2">
                Ali Akbar
              </span>
            </h1>
            
            <div className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8 h-10">
              <Typewriter 
                words={[
                  "Python Backend Developer", 
                  "AI Systems Engineer", 
                  "Backend Architect"
                ]} 
              />
            </div>
            
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground/80 mb-10 leading-relaxed">
              Building Intelligent Systems, AI Products, and Scalable Backend Architectures. 
              Specializing in <span className="text-foreground font-semibold">Django, Flask, and FastAPI</span> to create robust solutions that scale.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#projects" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_30px_rgba(0,200,255,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Projects
                <ChevronRight size={20} />
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold glass-panel text-foreground hover:bg-white/5 hover:-translate-y-1 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <a href="#about" className="p-3 rounded-full glass-panel text-muted-foreground hover:text-primary transition-colors inline-block">
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" title="About Me">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              I am a passionate <strong className="text-primary font-medium">Python Backend Developer</strong> and AI enthusiast based in Lahore, Pakistan. Over the past year, I have focused on designing and building scalable backends, integrating cutting-edge AI features, and developing RESTful APIs that power robust web applications.
            </p>
            <p>
              My expertise spans across major Python frameworks including <strong className="text-foreground">Django, Flask, and FastAPI</strong>. I thrive on architecting complex systems—from AI-enabled Learning Management Systems to high-performance SaaS platforms with sophisticated Role-Based Access Control (RBAC).
            </p>
            <p>
              Beyond traditional backend development, I have actively worked on integrating <strong className="text-accent font-medium">OpenAI's large language models</strong>, Computer Vision solutions (like face detection and OCR), and real-time communication systems, bridging the gap between innovative AI models and practical product engineering.
            </p>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <TerminalSquare size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground">1+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Years Experience</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                <Code2 size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground">5+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Projects Built</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl sm:col-span-2 flex flex-col items-center justify-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-2">
                <Wrench size={24} />
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground">10+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Technologies Mastered</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS SECTION */}
      <Section id="skills" title="Technical Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Backend Development",
              icon: <Server className="text-primary" size={24} />,
              skills: ["Python", "Django", "Flask", "FastAPI", "REST APIs", "Microservices"]
            },
            {
              title: "AI & Machine Learning",
              icon: <BrainCircuit className="text-accent" size={24} />,
              skills: ["OpenAI API", "LLMs", "Computer Vision", "CNN Models", "OCR Systems", "PyTorch"]
            },
            {
              title: "Databases",
              icon: <Database className="text-blue-400" size={24} />,
              skills: ["PostgreSQL", "MySQL", "SQLite", "SQL Optimization", "ORMs"]
            },
            {
              title: "Tools & Core Concepts",
              icon: <Wrench className="text-green-400" size={24} />,
              skills: ["Git", "Docker", "Linux", "CI/CD", "Socket.IO", "DSA", "OOP", "API Security", "RBAC"]
            }
          ].map((category, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl group hover:border-primary/30 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-muted-foreground border border-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE SECTION */}
      <Section id="experience" title="Experience">
        <div className="max-w-4xl mx-auto pl-4 md:pl-0">
          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line (Desktop centered, Mobile left) */}
            <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-1/2 rounded-full" />
            
            <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center w-full mb-8 group">
              {/* Dot */}
              <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary z-10 shadow-[0_0_15px_rgba(0,200,255,0.6)] group-hover:scale-125 transition-transform duration-300" />
              
              {/* Content Left (Date) */}
              <div className="md:w-[45%] md:text-right md:pr-12 mb-2 md:mb-0">
                <span className="inline-block px-4 py-2 rounded-full glass-panel text-primary font-medium text-sm font-display tracking-wider border-primary/20">
                  Jan 2025 – Present
                </span>
              </div>
              
              {/* Content Right (Details) */}
              <div className="md:w-[45%] md:pl-12">
                <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -z-10 rounded-full" />
                  
                  <h3 className="text-2xl font-bold font-display text-foreground mb-1">Associate Python Developer</h3>
                  <h4 className="text-lg text-primary font-medium mb-6">Codility Solutions</h4>
                  
                  <ul className="space-y-3 text-muted-foreground text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Designing and developing backend systems using Python (Django, Flask).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Creating and maintaining RESTful APIs.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Integrating OpenAI models for various AI-driven features.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Implementing robust authentication and Role-Based Access Control (RBAC).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Working directly with PostgreSQL and MySQL databases.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Handling data parsing and formatting for efficient workflows.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 text-accent size-1.5 rounded-full shrink-0 bg-accent" />
                      Collaborating closely with front-end teams for seamless integration.
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border border-yellow-500/20 flex items-center gap-4">
                    <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-500">Rising Star Award</h5>
                      <p className="text-xs text-yellow-500/70">Recognized for outstanding performance and contribution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI Child Content Monitoring",
              desc: "A system combining CNN models and OpenAI integrations to monitor and filter inappropriate content for children.",
              features: ["Real-time CNN image classification", "OpenAI text analysis", "Automated alert system"],
              tags: ["Python", "PyTorch", "OpenAI API", "FastAPI"]
            },
            {
              title: "AI-Enabled LMS",
              desc: "A comprehensive Learning Management System enhanced with AI capabilities for personalized learning paths.",
              features: ["Role-Based Access Control", "Automated grading", "Content summarization API"],
              tags: ["Django", "PostgreSQL", "REST Framework"]
            },
            {
              title: "Revoize Restaurant System",
              desc: "A full-scale backend infrastructure for a multi-tenant restaurant management SaaS application.",
              features: ["Multi-tenancy architecture", "Order processing queues", "Real-time updates via Socket.IO"],
              tags: ["Flask", "MySQL", "Socket.IO", "Docker"]
            },
            {
              title: "Face Detection System",
              desc: "Computer vision application for real-time face tracking, detection, and identity verification.",
              features: ["Live video stream processing", "High-accuracy recognition", "Optimized inference pipeline"],
              tags: ["Python", "OpenCV", "Deep Learning"]
            },
            {
              title: "Vision AI WhatsApp Chatbot",
              desc: "A WhatsApp bot that uses OCR and LLMs to extract text from images and provide intelligent responses.",
              features: ["WhatsApp Business API", "Tesseract OCR", "Context-aware conversation"],
              tags: ["FastAPI", "OpenAI", "Twilio", "OCR"]
            }
          ].map((project, idx) => (
            <TiltCard key={idx}>
              <div className="glass-card h-full p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Code2 size={24} />
                    </div>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display text-foreground mb-3 leading-tight">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{project.desc}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {project.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-primary mt-1">▹</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* CURRENTLY WORKING ON SECTION */}
      <Section id="current" title="Currently Working On">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured project */}
          <div className="lg:col-span-2 glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
                <span className="text-sm font-mono text-green-400 font-medium uppercase tracking-widest">Active Build</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">AI-Powered SaaS Platform</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Building a multi-tenant SaaS backend with FastAPI, integrating OpenAI's latest models for automated content workflows, intelligent document processing, and real-time collaboration APIs.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Backend Architecture", pct: 75 },
                  { label: "OpenAI Integration", pct: 60 },
                  { label: "Auth & RBAC System", pct: 90 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-primary font-mono font-medium">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["FastAPI", "OpenAI", "PostgreSQL", "Docker", "Redis"].map((tag) => (
                  <span key={tag} className="text-xs font-mono text-primary/80 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-6">
            {/* Learning card */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] pointer-events-none rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit size={20} className="text-accent" />
                  <span className="text-sm font-mono text-accent font-medium uppercase tracking-widest">Exploring</span>
                </div>
                <h4 className="text-lg font-display font-bold text-foreground mb-3">LLM Fine-Tuning</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diving deep into fine-tuning open-source LLMs on domain-specific datasets for production deployment pipelines.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "HuggingFace", "PEFT", "LoRA"].map((tag) => (
                    <span key={tag} className="text-xs font-mono text-accent/80 bg-accent/5 px-2 py-1 rounded border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Goal card */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-[50px] pointer-events-none rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Server size={20} className="text-blue-400" />
                  <span className="text-sm font-mono text-blue-400 font-medium uppercase tracking-widest">Next Goal</span>
                </div>
                <h4 className="text-lg font-display font-bold text-foreground mb-3">Cloud-Native Infra</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Deepening expertise in Kubernetes, microservice orchestration, and scalable ML model serving infrastructure.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Kubernetes", "AWS", "MLflow", "Kafka"].map((tag) => (
                    <span key={tag} className="text-xs font-mono text-blue-400/80 bg-blue-400/5 px-2 py-1 rounded border border-blue-400/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AWARDS SECTION */}
      <Section id="awards" title="Awards & Recognition">
        <div className="flex justify-center">
          <div className="glass-card p-12 rounded-3xl max-w-2xl w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-amber-500/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-yellow-500/10 blur-[60px] pointer-events-none" />
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)]">
                  <Trophy size={40} className="text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-foreground mb-2">Rising Star Award</h3>
              <h4 className="text-lg text-yellow-500 font-medium mb-6">Codility Solutions</h4>
              <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Recognized for outstanding performance, rapid technical growth, and consistent delivery of 
                high-quality backend systems that made a measurable impact on the team and products.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-semibold text-sm">
                <span>🏆</span> Outstanding Performer — 2025
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" title="Get In Touch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground mb-8">
              I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, my inbox is always open!
            </p>
            
            <div className="grid gap-4">
              <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</h4>
                  <a href="mailto:aliakbaar35@gmail.com" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                    aliakbaar35@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Phone</h4>
                  <a href="tel:+923054442780" className="text-lg font-medium text-foreground hover:text-accent transition-colors">
                    +92 305 444 2780
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-primary/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Location</h4>
                  <span className="text-lg font-medium text-foreground">
                    Lahore, Pakistan
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-6">
              <a href="https://github.com/ALiAkbaar35" target="_blank" rel="noreferrer" className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-primary hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/aliakbar-webdev/" target="_blank" rel="noreferrer" className="h-12 w-12 rounded-full glass-panel flex items-center justify-center text-foreground hover:text-primary hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Right: Contact Form */}
          <div>
            <form onSubmit={handleContactSubmit} className="glass-card p-8 rounded-3xl flex flex-col gap-6">
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Send a Message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground pl-1">Name</label>
                  <input 
                    id="name"
                    required
                    type="text" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground pl-1">Email</label>
                  <input 
                    id="email"
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-muted-foreground pl-1">Subject</label>
                <input 
                  id="subject"
                  required
                  type="text" 
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/50"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground pl-1">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,200,255,0.3)] hover:shadow-[0_0_25px_rgba(0,200,255,0.5)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-white/5 bg-background/80 backdrop-blur-md text-center mt-20 relative z-10">
        <p className="text-muted-foreground font-medium mb-2">
          Designed & Built by <span className="text-primary">Ali Akbar</span>
        </p>
        <p className="text-sm text-muted-foreground/60 font-mono">
          Python | AI | Backend Engineering
        </p>
      </footer>
    </div>
    
  );
}
