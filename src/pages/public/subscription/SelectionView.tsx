import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SelectionViewProps {
  onSelectTrainer: () => void;
  onSelectTrainee: () => void;
  onSelectJobSeeker: () => void; // New prop
}

const SelectionView: React.FC<SelectionViewProps> = ({
  onSelectTrainer,
  onSelectTrainee,
  onSelectJobSeeker,
}) => {
  return (
    <section className="text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl">
        انضم إلى مجتمع فلك المتميز
      </h2>
      <p className="mx-auto mb-8 max-w-4xl text-lg text-muted-foreground">
        سواء كنت خبيرًا تسعى لمشاركة معرفتك، طالبًا متحمسًا للتعلم، أو باحثًا عن
        فرصة عمل مرنة، فلك هي وجهتك المثالية لتحقيق طموحاتك. اختر مسارك الآن.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Trainer Selection Card */}
        <Card className="flex flex-col items-center rounded-xl p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1.5">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 p-4 text-5xl dark:bg-red-900/20">
            👨‍🏫
          </div>
          <h3 className="mb-4 text-2xl font-semibold">انضم كمدرب</h3>
          <p className="mb-6 flex-grow leading-relaxed text-muted-foreground">
            هل لديك شغف بالتدريس وخبرة قيمة؟ شارك معرفتك مع مجتمعنا.
          </p>
          <Button
            onClick={onSelectTrainer}
            className="w-full rounded-lg bg-[#800020] px-8 py-6 text-lg font-semibold text-white hover:bg-[#6e001c]"
          >
            التسجيل كمدرب
          </Button>
        </Card>

        {/* Trainee Selection Card */}
        <Card className="flex flex-col items-center rounded-xl p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1.5">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-100 p-4 text-5xl dark:bg-yellow-900/20">
            🎓
          </div>
          <h3 className="mb-4 text-2xl font-semibold">انضم كمتدرب</h3>
          <p className="mb-6 flex-grow leading-relaxed text-muted-foreground">
            اكتشف عالمًا من المعرفة والمهارات الجديدة مع دوراتنا عالية الجودة.
          </p>
          <Button
            onClick={onSelectTrainee}
            className="w-full rounded-lg bg-[#DAA520] px-8 py-6 text-lg font-semibold text-white hover:bg-[#b8860b]"
          >
            التسجيل كمتدرب
          </Button>
        </Card>

        {/* Job Seeker Selection Card - New */}
        <Card className="flex flex-col items-center rounded-xl p-8 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1.5 md:col-span-2 lg:col-span-1">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 p-4 text-5xl dark:bg-blue-900/20">
            💼
          </div>
          <h3 className="mb-4 text-2xl font-semibold">انضم كباحث عن عمل</h3>
          <p className="mb-6 flex-grow leading-relaxed text-muted-foreground">
            هل تبحث عن فرص عمل مرنة عن بعد؟ دعنا نساعدك في العثور عليها.
          </p>
          <Button
            onClick={onSelectJobSeeker}
            className="w-full rounded-lg bg-slate-700 px-8 py-6 text-lg font-semibold text-white hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700"
          >
            التسجيل كباحث عن عمل
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default SelectionView;
