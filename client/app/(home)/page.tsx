import SearchRepo from "@/components/hero-section/search-repo";
import Logo from "@/components/logo";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Zap, Lock, FolderOpen, Globe } from "lucide-react";

const page = () => {
  return (
    <main>
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        <BackgroundRippleEffect cols={40} rows={20} />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="flex justify-center">
            {" "}
            <Logo size={70} />
          </div>
          <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-widest mb-6 mt-2">
            Launchio
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Deploy any GitHub repo
            <br />
            in seconds.
          </h1>
          <p className="text-base text-muted-foreground max-w-sm mx-auto mb-10">
            Paste a URL or search a repository. We handle the rest.
          </p>

          <SearchRepo />

          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {[
              { icon: Zap, label: "Zero config" },
              { icon: Lock, label: "Env variables" },
              { icon: FolderOpen, label: "Monorepo support" },
              { icon: Globe, label: "Instant live URL" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Icon size={12} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
