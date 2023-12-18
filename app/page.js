import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser} from "@fortawesome/free-regular-svg-icons";
import { faClipboardUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Feature({ header, paragraph, style, icon }) {
  // const styles = {
  //   backgroundColor: {color},
  //   color: {color}
  // }
  return (
    <div className="feature_con">
      {/* <Image style={styles} src="/images/jam_refresh.svg" width={32} height={32} /> */}
      <div className="feature_icon">
        <FontAwesomeIcon style={style} className="employee" icon={icon}/>
      </div>
      <header>{header}</header>
      <p>{paragraph}</p>
    </div>
  );
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const dashboardLink = session && session.user.role === 'EMPLOYEE' ? `/employee/${session.user.id}` : '/admin/'
  return (
    <div>
      {session && (<p>Signed in as {session.user && session.user.name}</p>)}
      {session && console.log(session.user.role)}
      <div id="home" className="hero_con">
        <div className="hero_text">
          <div>
            <header>
              
              <h1>Streamline Your Workflow with StaffSentry.</h1>
            </header>
            <p>
              Seamlessly manage your workforce with our management app. Track their attendances, and supervise their leaves. <br /> All from the comfort of your desk. Employee management has never been this convenient.
            </p>
            <p><strong>Take Charge Now</strong></p>
          </div>
          {session && (
        <div className="cta">
          <Link href="/api/auth/signout">
          <button className="convinced">Sign out</button>
          </Link>
          <Link href={dashboardLink}>
          <button className="convinced">Go to dashboard</button>
          </Link>
        </div>
      )}

      {!session && (
        <div className="cta">
        <Link href={`/api/auth/signin`}>
        <button id="signin" className="hooked">Get Hooked</button>
        </Link>
        <button className="convinced"><a href="#about">Not Convinced?</a></button>
        </div>
      )}
        </div>
        <Image src="/images/hero.png" width={360} height={320} className="hero_img" alt="hero image" />
      </div>
      <div id="about" className="features">
        <div>
          <h4 className="highlight">THE FUTURE IN YOUR PALM</h4>
          <header className="intro">Key Features</header>
          <p className="desc">
            An all-you-can-eat buffet. Your imagination is the limit. From employee management, to attendance tracking and leave management.
            <br /> Not Satisfied? Tell us what you want and we'll implement it ASAP.
          </p>
        </div>
        <div className="feature_list">
          <Feature icon={faUser} style={{color: "#31A0FE", backgroundColor: "#D4EAF6"}} paragraph="Organize and manage employeees without stress." header="Employee Management" />
          <Feature icon={faClipboardUser} style={{color: "#23856D", backgroundColor: "#D6F1CC"}} paragraph="No more need to worry about ghost workers. Effortlessy track their attendance." header="Attendance Tracking" />
          <Feature icon={faRightFromBracket} style={{color: "#EC5C2E", backgroundColor: "#F3DCD5"}} paragraph="Disturbed about unfavourable leave schedules and clashes? We've got you covered." header="Leave Management" />
        </div>
      </div>
      <section className="hero_con foot">
        <div className="hero_text">
          <div>
            <header>
              <h1>Can't wait to start?</h1>
            </header>
            <div className="cta">
            <button className="hooked"> <a href="#signin">Take Charge</a></button>
            {/* <button className="convinced">Get Convinced</button> */}
          </div>
          </div>
          
        </div>
        <div id="contact" className="hero_text">
          <div>
            <header>
              <h1>Or reach out to us</h1>
            </header>
            <p>
              Your satisfaction is our priority
            </p>
          </div>
          <div className="contact">
            {/* <button className="hooked">Get Hooked</button> */}
            <Link href="https://www.facebook.com/amure.samuel.5" >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link href="https://twitter.com/SUN72314754?t=TuAn3ZFQMxYk0OxFl-LhOg&s=09" >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link href="https://www.instagram.com/zettai___/" >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="https://www.linkedin.com/in/samuel-amure-7824b9137" >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
 
          </div>
        </div>
      </section>
    </div>
  );
}
// 'use client'
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }
