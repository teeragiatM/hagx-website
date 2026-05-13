"use client";

import SectionHeader from "@/components/SectionHeader";
import { useI18n } from "@/i18n/useI18n";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Text } from "./ui";

type PortfolioItem = {
  title: string;
  sub: string;
  desc: string;
  image: string;
  slug: string;
  scope: string;
};

export default function HomePortfolioSection({
  portfolio,
}: {
  portfolio: PortfolioItem[];
}) {
  const { t } = useI18n();
  const [activeProject, setActiveProject] = useState(0);

  if (portfolio.length === 0) return null;

  return (
    <section className="ui-padding">
      <div className="ui-margin">
        <SectionHeader
          eyebrow={t("projects.eyebrow")}
          heading={t("projects.title")}
          layout="split"
          action={
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center border border-white/20 px-8 text-xs font-light uppercase tracking-normal text-white/60 transition-colors hover:border-white hover:text-white"
            >
              {t("projects.see_all")}
            </Link>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[220px_1fr_110px] lg:items-end">
          <div>
            <Text
              as="p"
              size={{ initial: "1" }}
              weight={{ initial: "light" }}
              uppercase
              color=""
              className="mb-2"
            >
              {portfolio[activeProject]?.scope}
            </Text>
            <h3 className="mb-4 text-xl font-light text-white/85">
              {portfolio[activeProject]?.title}
            </h3>
            <Text as="p" size={{initial:"1"}} weight={{initial:"light"}} color="gray" className="mb-2">
              {portfolio[activeProject]?.sub}
            </Text>
            <Text as="p" size={{initial:"2"}} weight={{initial:"light"}} color="gray" className="mb-6">
              {portfolio[activeProject]?.desc}
            </Text>
            <Link
              href={`/portfolio/${portfolio[activeProject]?.slug}`}
              className="text-xs font-light uppercase tracking-normal text-white/40 underline underline-offset-4 transition-colors hover:text-white"
            >
              {t("projects.view")}
            </Link>
          </div>

          <Link
            href={`/portfolio/${portfolio[activeProject]?.slug}`}
            className="group block"
          >
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[300px] overflow-hidden border border-white/[0.06] lg:h-[460px]"
            >
              <Image
                src={portfolio[activeProject]?.image}
                alt={portfolio[activeProject]?.title}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
          </Link>

          <div className="flex flex-row gap-2 lg:flex-col">
            {portfolio.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveProject(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden border transition-all lg:h-24 lg:w-full ${
                  i === activeProject
                    ? "border-[#DB5828] opacity-100"
                    : "border-white/10 opacity-45 hover:opacity-70"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="110px"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
