import React from 'react';

const SidebarItem = ({ icon, title, subtitle, active }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 16,
      cursor: 'pointer',
      backgroundColor: active ? '#e6f0ff' : 'transparent',
      padding: '6px 10px',
      borderRadius: 8,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 18, color: active ? '#457bff' : '#555' }}>{icon}</span>
      <span style={{ fontWeight: '600', fontSize: 14, color: active ? '#457bff' : '#111' }}>{title}</span>
    </div>
    {subtitle && (
      <span
        style={{
          fontSize: 12,
          color: '#7a7a7a',
          marginLeft: 28,
          marginTop: 2,
          fontWeight: '400',
          lineHeight: 1.2,
        }}
      >
        {subtitle}
      </span>
    )}
  </div>
);

const Tag = ({ children, bgColor, color }) => (
  <span
    style={{
      backgroundColor: bgColor || '#eee',
      color: color || '#000',
      borderRadius: 100,
      padding: '3px 10px',
      fontWeight: 600,
      fontSize: 12,
      marginRight: 6,
      textTransform: 'lowercase',
      display: 'inline-block',
    }}
  >
    {children}
  </span>
);

const SkillTag = ({ children }) => (
  <span
    style={{
      backgroundColor: '#f5f5f5',
      color: '#555',
      borderRadius: 8,
      padding: '4px 12px',
      fontSize: 12,
      marginRight: 6,
      fontWeight: 500,
      display: 'inline-block',
      marginTop: 6,
    }}
  >
    {children}
  </span>
);

const Button = ({ children, icon, primary = false }) => (
  <button
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      cursor: 'pointer',
      padding: '10px 0',
      fontWeight: 600,
      fontSize: 14,
      borderRadius: 6,
      border: primary ? 'none' : '1px solid #ddd',
      color: primary ? '#fff' : '#000',
      background: primary ? '#111' : '#fff',
    }}
  >
    {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
    {children}
  </button>
);

const ProjectCard = ({
  title,
  description,
  tags,
  members,
  dueDate,
  skills,
  recruiting = true,
}) => (
  <div
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      width: 320,
      boxSizing: 'border-box',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 280,
    }}
  >
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 6px 6px 0',
            flexGrow: 1,
          }}
        >
          {title}
        </h3>
        {recruiting && (
          <Tag bgColor="#eee" color="#777">
            recruiting
          </Tag>
        )}
        <div
          title="Delete"
          style={{ cursor: 'pointer', color: '#ccc', marginLeft: 'auto' }}
        >
          🗑️
        </div>
      </div>
      <p
        style={{
          fontSize: 14,
          color: '#555',
          lineHeight: 1.4,
          maxHeight: 70,
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        {description}
      </p>
      <div style={{ marginBottom: 12 }}>
        {tags.map(({ text, bgColor, color }, idx) => (
          <Tag key={idx} bgColor={bgColor} color={color}>
            {text}
          </Tag>
        ))}
      </div>
      <div style={{ fontSize: 14, color: '#555', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>👥</span> {members}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>📅</span> {dueDate}
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        {skills.map((skill, idx) => (
          <SkillTag key={idx}>{skill}</SkillTag>
        ))}
      </div>
    </div>
    <div
      style={{
        marginTop: 16,
        display: 'flex',
        gap: 10,
      }}
    >
      <Button icon="👁️">Explore</Button>
      <Button icon="👤" primary>
        Join Team
      </Button>
    </div>
  </div>
);

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f9f8fd' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          padding: 20,
          backgroundColor: '#fff',
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div
            style={{
              background:
                'linear-gradient(135deg, #7648ff, #5e32b2)',
              width: 45,
              height: 45,
              borderRadius: 12,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 24,
              userSelect: 'none',
            }}
          >
            {'</>'}
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#222' }}>
              Developer Chowk
            </h2>
            <p style={{ margin: 0, fontWeight: 400, fontSize: 13, color: '#666' }}>
              Build. Collaborate. Grow.
            </p>
          </div>
        </div>
        {/* Menu */}
        <nav style={{ flex: 1, color: '#444', fontSize: 14 }}>
          <SidebarItem icon="🏠" title="Home" subtitle="Your personalized feed" />
          <SidebarItem icon="📁" title="ProjectArena" subtitle="Discover & collaborate" />
          <SidebarItem icon="👥" title="TeamsHive" subtitle="Find your squad" active />
          <SidebarItem icon="💼" title="Prolance" subtitle="Earn while you code" />
          <SidebarItem icon="⚙️" title="Bug Bounty" subtitle="Fix & get rewards" />
          <SidebarItem icon="💬" title="Let's Connect" subtitle="Find mentors" />
          <SidebarItem icon="📄" title="MindMerge" subtitle="Buy & sell notes" />
          <SidebarItem icon="📚" title="StudyStack" subtitle="Courses & materials" />
          <SidebarItem icon="🏆" title="Leaderboard" subtitle="Compete & rank up" />
        </nav>
        {/* Profile */}
        <div
          style={{
            marginTop: 40,
            padding: 16,
            borderRadius: 14,
            backgroundColor: 'rgba(118, 72, 255, 0.1)',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background:
                  'linear-gradient(135deg, #7648ff, #512fbc)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              A
            </div>
            <div>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: 14, color: '#222' }}>
                Anjali Arora
              </h3>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  padding: '2px 12px',
                  borderRadius: 18,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#444',
                  width: 72,
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                Developer
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', color: '#555', fontSize: 13 }}>
            <div><span style={{ color: '#3ab54a' }}>Streak:</span> 0</div>
            <div><span style={{ color: '#eda421' }}>Rating:</span> 0</div>
            <div><span style={{ color: '#4269ff' }}>Projects:</span> 0</div>
            <div><span style={{ color: '#e44343' }}>Bugs:</span> 0</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          padding: '32px 44px 44px',
          backgroundColor: '#faf9ff',
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 24,
                color: '#111',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                userSelect: 'none',
              }}
            >
              <span>👥</span> TeamsHive
            </h1>
            <p style={{ marginTop: 6, fontSize: 15, color: '#333' }}>
              Create teams, collaborate on projects, and grow together
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <button
              style={{
                padding: '10px 24px',
                backgroundColor: '#7c3aed',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                boxShadow:
                  '0 6px 15px rgba(124, 58, 237, 0.4)',
              }}
            >
              + Create Team Room
            </button>
            <button
              style={{
                padding: '10px 24px',
                background:
                  'linear-gradient(90deg, #4c65ff, #7851ff)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                boxShadow:
                  '0 6px 15px rgba(75, 103, 255, 0.45)',
              }}
            >
              + Looking for Team Members
            </button>
          </div>
        </header>

        {/* Tabs */}
        <nav
          style={{
            display: 'flex',
            gap: 30,
            marginBottom: 30,
            fontWeight: 600,
            fontSize: 15,
            color: '#888',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              padding: '10px 30px',
              borderRadius: 8,
              backgroundColor: '#fff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              color: '#222',
              cursor: 'pointer',
            }}
          >
            Browse Projects
          </div>
          <div style={{ cursor: 'pointer' }}>Browse Rooms</div>
          <div style={{ cursor: 'pointer' }}>My Rooms</div>
          <div style={{ cursor: 'pointer' }}>Applications</div>
        </nav>

        {/* Projects */}
        <section
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <ProjectCard
            title="E-Commerce Platform with AI Recommendations"
            description="Building a full-featured e-commerce platform with AI-powered product recommendations, real-time inventory management, and secure..."
            tags={[
              { text: 'advanced', bgColor: '#fce7e7', color: '#c14444' },
              { text: 'web development', bgColor: '#f0f0f0', color: '#333' },
            ]}
            members="2/5 members"
            dueDate="Due by Aug 15, 2024"
            skills={['React', 'Node.js', 'MongoDB']}
          />
          <ProjectCard
            title="Medical Image Analysis with Deep Learning"
            description="Developing a deep learning model to analyze medical images for disease detection. Includes data preprocessing, model training, and..."
            tags={[
              { text: 'advanced', bgColor: '#fce7e7', color: '#c14444' },
              { text: 'ai ml', bgColor: '#f0f0f0', color: '#333' },
            ]}
            members="3/4 members"
            dueDate="Due by Sep 1, 2024"
            skills={['Python', 'TensorFlow', 'Keras']}
          />
          <ProjectCard
            title="Social Media App for College Students"
            description="Creating a mobile-first social networking app specifically designed for college students with features like study groups, event planning, an..."
            tags={[
              { text: 'intermediate', bgColor: '#fbf1cc', color: '#bfa821' },
              { text: 'mobile app', bgColor: '#f0f0f0', color: '#333' },
            ]}
            members="1/4 members"
            dueDate="Due by Jul 30, 2024"
            skills={['React Native', 'Firebase', 'Node.js']}
          />

          {/* Additional project cards with no descriptions */}
          <ProjectCard
            title="Decentralized Task Management DApp"
            description=""
            tags={[]}
            members=""
            dueDate=""
            skills={[]}
          />
          <ProjectCard
            title="Real-time Collaboration Whiteboard"
            description=""
            tags={[]}
            members=""
            dueDate=""
            skills={[]}
          />
        </section>
      </main>
    </div>
  );
}
