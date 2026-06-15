

const newProcessData = [
  {
    title: "1. Requirements",
    desc: "We conduct in-depth analysis and collaborative workshops to fully understand your business goals, target audience, and technical needs.",
    imageUrl: "/process/step1_requirements.png"
  },
  {
    title: "2. Agreement",
    desc: "We formalize our partnership with clear timelines, deliverables, and a transparent contract ensuring all expectations are aligned.",
    imageUrl: "/process/step2_agreement.png"
  },
  {
    title: "3. UI/UX Design",
    desc: "Our design team crafts intuitive, engaging, and visually stunning interfaces tailored specifically to your brand identity.",
    imageUrl: "/process/step3_uiux.png"
  },
  {
    title: "4. Development",
    desc: "Our engineers write clean, scalable, and highly performant code, transforming the approved designs into a fully functional product.",
    imageUrl: "/process/step4_development.png"
  },
  {
    title: "5. Testing",
    desc: "We rigorously test the application across multiple devices and environments to ensure security, stability, and zero bugs.",
    imageUrl: "/process/step5_testing.png"
  },
  {
    title: "6. Client Approval",
    desc: "We present the final product for your review. We only move forward when you are 100% satisfied with the result.",
    imageUrl: "/process/step6_approval.png"
  },
  {
    title: "7. Deployment",
    desc: "We carefully launch your application to live production environments using automated CI/CD pipelines to ensure zero downtime.",
    imageUrl: "/process/step7_deployment.png"
  },
  {
    title: "8. User Experience",
    desc: "We monitor how real users interact with your platform and gather metrics to ensure a seamless and delightful journey.",
    imageUrl: "/process/step8_ux.png"
  },
  {
    title: "9. Analogue Monitor",
    desc: "We provide 24/7 continuous system monitoring and analogue health checks to guarantee uptime and lightning-fast performance.",
    imageUrl: "https://b2bwebsolutions.com/process/step9_analogue.png"
  }
];

const updateProcess = async () => {
  try {
    console.log("Logging in...");
    const loginRes = await fetch('https://api.b2bwebsolutions.com/api/auth/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email: 'admin@b2b.com', password: 'admin123' })
    });
    if (!loginRes.ok) throw new Error("Login failed: " + await loginRes.text());
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log("Logged in successfully. Updating content...");

    const updateRes = await fetch('https://api.b2bwebsolutions.com/api/content', {
       method: 'POST',
       headers: { 
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}` 
       },
       body: JSON.stringify({
         pageKey: 'home_process',
         title: 'Our Proven Process',
         description: 'From initial concept to global launch, we follow a rigorous and transparent 9-step methodology.',
         data: newProcessData
       })
    });
    if (!updateRes.ok) throw new Error("Update failed: " + await updateRes.text());
    
    console.log("Successfully updated Our Process in DB via API!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating DB via API:", error.message);
    process.exit(1);
  }
};

updateProcess();
