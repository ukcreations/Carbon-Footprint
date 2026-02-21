'use client';

import { HeroSection } from '@/components/hero-section';
import { Code2, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Ananya Srivastava',
      role: 'Backend Engineer & UI/UX Designer',
      description: 'Leading backend development and platform design, ensuring COUNT CARBON delivers robust infrastructure and intuitive interface for mining operators.',
      expertise: [
        'Python & Django',
        'Database architecture',
        'User interface design',
        'API development',
      ],
      isLeader: false,
    },
    {
      name: 'Sneha',
      role: 'Project Lead & ML Specialist',
      description: 'Leading the entire COUNT CARBON project with vision and expertise in advanced machine learning models for accurate emission predictions and sustainable mining solutions.',
      expertise: [
        'Project Leadership',
        'Machine learning algorithms',
        'Data analysis',
        'Strategic planning',
      ],
      isLeader: true,
    },
    {
      name: 'Shaik Rafi',
      role: 'Frontend Engineer & Full-Stack Developer',
      description: 'Building interactive dashboard and frontend components that bring real-time emission data to life for end-users.',
      expertise: [
        'React.js & Next.js',
        'Data visualization',
        'Frontend performance',
        'System integration',
      ],
      isLeader: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="About COUNT CARBON"
        subtitle="Carbon Emissions Management Platform"
        description="COUNT CARBON empowers coal mining industries to monitor, predict, and reduce their carbon footprint through advanced technology and data-driven insights."
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                To enable Indian coal mining industries to achieve sustainable emissions management through real-time monitoring, AI-powered prediction, and comprehensive gap analysis.
              </p>
              <p className="text-base text-muted-foreground">
                We believe that technology can empower organizations to meet their environmental responsibilities while maintaining operational efficiency and profitability. COUNT CARBON bridges the gap between regulatory compliance and practical sustainability.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                To establish COUNT CARBON as the industry standard for carbon footprint management across all industrial sectors in India and beyond.
              </p>
              <p className="text-base text-muted-foreground">
                We envision a future where every mining operation has visibility into its emissions, predictive insights for planning, and data-driven strategies for continuous improvement. Together, we can achieve India's climate goals while fostering sustainable industrial growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A passionate team of developers and designers united by a vision for sustainable mining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx} 
                className={`rounded-lg border p-8 relative overflow-hidden transition-all duration-300 ${
                  member.isLeader 
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'border-border bg-background'
                }`}
                style={
                  member.isLeader 
                    ? {
                        backgroundImage: 'url("/sneha_background.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative'
                      }
                    : {}
                }
              >
                {member.isLeader && (
                  <div className="absolute inset-0 bg-green-900/30 backdrop-blur-sm"></div>
                )}
                {member.isLeader && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full z-10">
                    LEADER
                  </div>
                )}
                
                <div className={`mb-6 relative z-10 ${member.isLeader ? 'text-white' : ''}`}>
                  <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    member.isLeader 
                      ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/40 animate-pulse' 
                      : 'bg-primary/10'
                  }`}>
                    <Code2 className={`h-10 w-10 ${member.isLeader ? 'text-primary-foreground' : 'text-primary'}`} />
                  </div>
                  <h3 className={`text-xl font-bold text-center ${member.isLeader ? 'text-white drop-shadow-lg' : 'text-foreground'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm font-semibold text-center mt-1 ${
                    member.isLeader ? 'text-white/90 drop-shadow' : 'text-primary'
                  }`}>
                    {member.role}
                  </p>
                </div>

                <p className={`text-sm mb-6 text-center relative z-10 ${member.isLeader ? 'text-white/95 drop-shadow' : 'text-muted-foreground'}`}>
                  {member.description}
                </p>

                <div className={`border-t pt-6 relative z-10 ${member.isLeader ? 'border-white/20' : 'border-border'}`}>
                  <p className={`text-xs font-semibold mb-3 uppercase tracking-wide ${member.isLeader ? 'text-white' : 'text-foreground'}`}>
                    Key Expertise
                  </p>
                  <div className="space-y-2">
                    {member.expertise.map((skill, skillIdx) => (
                      <div
                        key={skillIdx}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 ${
                          member.isLeader 
                            ? 'bg-white/20 text-white border border-white/30 backdrop-blur-sm' 
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Project Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Project Name',
                value: 'COUNT CARBON FOOTPRINT',
              },
              {
                label: 'Category',
                value: 'Environmental Management',
              },
              {
                label: 'Problem Area',
                value: 'Sustainable Mining & Environment',
              },
              {
                label: 'Team Size',
                value: '3 Core Members',
              },
              {
                label: 'Technology Stack',
                value: 'React, Python, Django, MongoDB',
              },
              {
                label: 'Target Sector',
                value: 'Coal Mining Industry',
              },
              {
                label: 'Key Innovation',
                value: 'Real-time ML Prediction',
              },
              {
                label: 'Launch Status',
                value: 'Production Ready',
              },
            ].map((detail, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-background p-6">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  {detail.label}
                </p>
                <p className="text-lg font-semibold text-foreground">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Join the Sustainable Mining Revolution
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            COUNT CARBON is ready for deployment in mining operations across India. Let's work together to achieve sustainable emissions management and meet our climate goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Explore Dashboard
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
