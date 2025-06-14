import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Button } from "@/components/ui/button"; // Import Button for styling
import { ArrowRight } from "lucide-react"; // Import ArrowRight icon

import SelectionView from "./SelectionView";
import TrainerForm from "./TrainerForm";
import TraineeForm from "./TraineeForm";
import JobSeekerForm from "./JobSeekerForm";

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
  // State to manage the currently displayed view
  const [currentView, setCurrentView] = useState<View>("selection");

  const handleSubscriptionSuccess = () => {
    console.log("Subscription request submitted successfully!");
    // The success dialog now handles resetting the form and navigating back to selection view
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

      <main className="container mx-auto flex flex-grow flex-col items-center justify-center p-6 md:p-10">
        {/* New Back to Main Website Button */}
        {renderContent()}
        <div className="mt-10 flex w-full justify-center">
          {" "}
          {/* justify-start aligns to right in RTL */}
          <Link to="/">
            <Button variant="default">
              <ArrowRight className="mr-2 h-4 w-4" />{" "}
              {/* Arrow points right, intuitive for RTL "back/exit" */}
              العودة للموقع الرئيسي
            </Button>
          </Link>
        </div>
      </main>

      <footer className="mt-3 bg-gray-800 p-6 text-center text-white dark:bg-black">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} فلك. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionPage;
