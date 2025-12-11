import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';


export default function Experience() {
    return (  <>
    <section id="experience" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8  ">Professional Experience</h2>
         <Timeline position="alternate">
              <TimelineItem>
             <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2" 
           className="text-3xl font-bold mb-8 text-gray-700 dark:text-green-400"
        >
          Jun 2024 - Dec 2024 (6 Months)
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
            <TimelineDot color="primary">
                <CodeRoundedIcon />
            </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
         <Typography variant="h5" component="span"  color="primary" className="text-2xl font-bold mb-2">
  Junior Developer Intern
</Typography>

<Typography
  className="text-xs text-gray-600 dark:text-gray-400 mb-1 pl-3"
>
  Bizmo Technologies Pvt. Ltd, Pune
</Typography>

<br></br>
<Typography
  variant="body2"
  className="text-gray-500 dark:text-gray-400 leading-relaxed pl-4"
>
  • Developed and maintained web applications using Django and React.js, improving user experience and functionality.
  <br />
  • Collaborated with cross-functional teams to design RESTful APIs, ensuring seamless integration between frontend and backend systems.
  <br />
  • Implemented responsive UI components using Bootstrap, enhancing accessibility across devices.
  <br />
  • Participated in code reviews and debugging sessions, contributing to code quality and performance optimization.
</Typography>


        </TimelineContent>
        
        </TimelineItem>
        <TimelineItem>

  {/* LEFT SIDE — DATE */}
  <TimelineOppositeContent
    align="left"
    sx={{ m: "auto 0" }}
    variant="body2"
    className="text-xl font-semibold text-gray-700 dark:text-green-400"
  >
   2022 - 2023
  </TimelineOppositeContent>

  {/* MIDDLE DOT + CONNECTORS */}
  <TimelineSeparator>
    <TimelineConnector />
    <TimelineDot color="warning">
      <ComputerRoundedIcon />
    </TimelineDot>
    <TimelineConnector />
  </TimelineSeparator>

  {/* RIGHT SIDE — CONTENT */}
  <TimelineContent sx={{ py: 1, px: 2 }} className="text-left">

  <Typography
    variant="h6"
    component="div"
    className="text-2xl font-bold text-primary mb-1 text-left"
  >
    Intern
  </Typography>

  <Typography className="text-xs text-gray-600 dark:text-gray-400 mb-2 pl-2 text-left">
   A2Z Infotech, Ahmednagar
  </Typography>

  <Typography
    variant="body2"
    className="text-gray-500 dark:text-gray-400 leading-relaxed pl-4 text-left"
  >
    •Worked on live projects using HTML, CSS, JavaScript, Java, and MySQL, gaining full-stack development experience.
    <br />
    • ssisted in the development of web applications and collaborated on designing interactive user interfaces.
    <br />
    • Contributed to debugging and resolving issues in the codebase, ensuring smooth functionality.
    <br />
      </Typography>

</TimelineContent>
</TimelineItem>

         </Timeline>
        </div>
    </section>
    </>)
}
 