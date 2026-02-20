'use client';

import { HeroSection } from '@/components/hero-section';
import { Code2, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sneha',
      role: 'Product Lead & UI/UX Designer',
      description: 'Spearheading the platform design and user experience strategy, ensuring COUNT CARBON delivers an intuitive interface for mining operators.',
      expertise: [
        'Product strategy',
        'User interface design',
        'User experience optimization',
        'Stakeholder management',
      ],
    },
    {
      name: 'Ananya Srivastava',
      role: 'Backend Engineer & ML Specialist',
      description: 'Leading the development of robust backend infrastructure and advanced machine learning models for accurate emission predictions.',
      expertise: [
        'Python & Django',
        'Machine learning algorithms',
        'Database architecture',
        'API development',
      ],
    },
    {
      name: 'Shaik Rafi',
      role: 'Frontend Engineer & Full-Stack Developer',
      description: 'Building the interactive dashboard and frontend components that bring real-time emission data to life for end-users.',
      expertise: [
        'React.js & Next.js',
        'Data visualization',
        'Frontend performance',
        'System integration',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="About COUNT CARBON"
        subtitle="SIH Idea Submission"
        description="A innovative solution developed for the Smart India Hackathon, COUNT CARBON empowers coal mining industries to monitor, predict, and reduce their carbon footprint through advanced technology and data-driven insights."
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
              <div key={idx} className="rounded-lg border border-border bg-background p-8">
                <div className="mb-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Code2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground text-center">{member.name}</h3>
                  <p className="text-sm font-semibold text-primary text-center mt-1">
                    {member.role}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-6 text-center">
                  {member.description}
                </p>

                <div className="border-t border-border pt-6">
                  <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Expertise
                  </p>
                  <div className="space-y-2">
                    {member.expertise.map((skill, skillIdx) => (
                      <div
                        key={skillIdx}
                        className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium mr-2 mb-2"
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

      {/* Journey Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Our Journey
          </h2>

          <div className="space-y-8">
            {[
              {
                phase: 'Ideation',
                description:
                  'We identified a critical gap in carbon emissions monitoring for Indian coal mining industries. Existing solutions either lacked real-time capabilities or were prohibitively expensive. This inspired us to create COUNT CARBON.',
              },
              {
                phase: 'Research & Development',
                description:
                  'We conducted extensive research on emission calculation methodologies, ML models for prediction, and regulatory requirements. Our team reviewed industry standards and worked with domain experts to understand the challenges.',
              },
              {
                phase: 'Technology Development',
                description:
                  'We built a comprehensive platform combining React frontend, Python/Django backend, and advanced ML algorithms. The system architecture ensures scalability, reliability, and real-time data processing.',
              },
              {
                phase: 'Smart India Hackathon Submission',
                description:
                  'COUNT CARBON was developed as an idea submission for the Smart India Hackathon, aiming to showcase innovation in sustainable industrial practices. Our solution demonstrates technical excellence and social impact.',
              },
            ].map((journey, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {journey.phase}
                  </h3>
                  <p className="text-muted-foreground">{journey.description}</p>
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
                value: 'Smart India Hackathon (SIH)',
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
