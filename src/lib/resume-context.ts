import { profile } from './profile'
import { workHistory, earlierWorkHistory, education, skills, ventures } from './experience'
import { projects } from './projects'

// Derive the assistant's facts from the same content displayed on the portfolio.
export const LUIS_CONTEXT = `
## Identity
Name: ${profile.name}
Current status: USC graduate student in Computer Science, Artificial Intelligence.
Career interests: ${profile.roleInterests.join(", ")}.
Availability: ${profile.opportunityStatement}
Email: ${profile.email}
Phone: ${profile.phone}
Website: ${profile.website}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

## Education
${education.map(item => `**${item.school}**
- Degree: ${item.degree}
- Location: ${item.location}
- Dates: ${item.dateRange}${item.gpa ? `\n- GPA: ${item.gpa}` : ''}${item.coursework ? `\n- Relevant coursework: ${item.coursework.join(', ')}` : ''}`).join('\n\n')}
No USC GPA is supplied in the current resume. Do not infer one.

## Work experience from the updated resume
${workHistory.map(role => `**${role.company} — ${role.title}**
- Location: ${role.location}
- Dates: ${role.dateRange}
${role.achievements.map(item => `- ${item}`).join('\n')}`).join('\n\n')}

## Earlier experience retained from the previous portfolio
${earlierWorkHistory.map(role => `**${role.company} — ${role.title}**
- Dates: ${role.dateRange}
- Location: ${role.location}
${role.achievements.map(item => `- ${item}`).join('\n')}`).join('\n\n')}

## Projects
${projects.map(project => `**${project.title}**
- ${project.subtitle}
- Dates: ${project.dateRange}
- What was built: ${project.solution}
- Stack: ${project.stack.join(', ')}
${project.outcomes.map(item => `- ${item}`).join('\n')}${project.liveUrl ? `\n- Live URL: ${project.liveUrl}` : ''}${project.liveNote ? `\n- Current website status: ${project.liveNote}` : ''}${project.githubUrl ? `\n- GitHub: ${project.githubUrl}` : ''}`).join('\n\n')}

## Technical skills
${Object.entries(skills).map(([category, items]) => `**${category}:** ${items.join(', ')}`).join('\n')}

## Additional website and business projects
${ventures.map(venture => `**${venture.name}** — ${venture.description}. Website: ${venture.url}.${venture.revenue ? ` Previously reported revenue: ${venture.revenue}; no updated revenue figure is supplied.` : ''}`).join('\n')}
`
