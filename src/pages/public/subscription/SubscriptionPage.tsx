import React, { useState } from "react";
import SelectionView from "./SelectionView";
import TrainerForm from "./TrainerForm";
import TraineeForm from "./TraineeForm";
import JobSeekerForm from "./JobSeekerForm"; // New Import

// Define the possible views the page can display
type View = "selection" | "trainer" | "trainee" | "jobSeeker";

// Configuration for page titles and subtitles based on the current view
const pageInfo: Record<View, { title: string; subtitle: string }> = {
  selection: {
    title: "أكاديمية فلك",
    subtitle: "بوابتك للمعرفة والفرص",
  },
  trainer: {
    title: "أكاديمية فلك للتدريب",
    subtitle: "بوابة العلم والمعرفة لجيل المستقبل",
  },
  trainee: {
    title: "أكاديمية فلك للتدريب",
    subtitle: "بوابة العلم والمعرفة لجيل المستقبل",
  },
  jobSeeker: {
    title: "فلك للموارد البشرية",
    subtitle: "بوابتك لفرص العمل عن بعد",
  },
};

const SubscriptionPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("selection");

  const handleSubscriptionSuccess = () => {
    console.log("Subscription request submitted successfully!");
    setTimeout(() => setCurrentView("selection"), 2000);
  };

  const handleBack = () => setCurrentView("selection");

  const renderContent = () => {
    switch (currentView) {
      case "trainer":
        return (
          <TrainerForm
            onBack={handleBack}
            onSuccess={handleSubscriptionSuccess}
          />
        );
      case "trainee":
        return (
          <TraineeForm
            onBack={handleBack}
            onSuccess={handleSubscriptionSuccess}
          />
        );
      case "jobSeeker":
        return (
          <JobSeekerForm
            onBack={handleBack}
            onSuccess={handleSubscriptionSuccess}
          />
        );
      case "selection":
      default:
        return (
          <SelectionView
            onSelectTrainer={() => setCurrentView("trainer")}
            onSelectTrainee={() => setCurrentView("trainee")}
            onSelectJobSeeker={() => setCurrentView("jobSeeker")}
          />
        );
    }
  };

  const { title, subtitle } = pageInfo[currentView];

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950"
      dir="rtl"
    >
      <header className="bg-gradient-to-r from-[#A52A2A] to-[#800020] p-6 text-white shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-2 text-xl font-light md:text-2xl">{subtitle}</p>
        </div>
      </header>

      <main className="container mx-auto flex flex-grow items-center justify-center p-6 md:p-10">
        {renderContent()}
      </main>

      <footer className="mt-12 bg-gray-800 p-6 text-center text-white dark:bg-black">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} فلك. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionPage;
