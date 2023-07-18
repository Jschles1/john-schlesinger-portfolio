"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageProfileMobile from "public/images/image-profile-mobile.webp";
import ImageProfileTablet from "public/images/image-profile-tablet.webp";
import ImageProfileDesktop from "public/images/image-profile-desktop.webp";
import PatternRings from "public/images/pattern-rings.svg";
import PatternCircle from "public/images/pattern-circle.svg";
import {
  HEADER_LINKS,
  TECHNOLOGIES,
  PROJECTS,
  ERROR_MSG,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: ERROR_MSG })
    .max(50, { message: ERROR_MSG }),
  email: z
    .string()
    .email({ message: ERROR_MSG })
    .min(2, { message: ERROR_MSG })
    .max(50, { message: ERROR_MSG }),
  message: z
    .string()
    .min(2, { message: ERROR_MSG })
    .max(500, { message: ERROR_MSG }),
});

type FormSchema = z.infer<typeof formSchema>;

function HeaderLink({
  href,
  icon,
  alt,
}: {
  href: string;
  icon: any;
  alt: string;
}) {
  return (
    <Link href={href}>
      <Image src={icon} alt={alt} />
    </Link>
  );
}

function TechnologyItem({
  name,
  experience,
}: {
  name: string;
  experience: string;
}) {
  return (
    <div className="flex flex-col items-center mb-6 last:mb-0 md:mb-0 md:basis1/2 md:w-1/2 md:items-start xl:basis-1/3 xl:w-1/3 2xl:basis-1/3 2xl:w-1/3">
      <p className="text-white text-[2rem] font-bold md:text-[3rem]">{name}</p>
      <p className="text-gray md:text-[1.125rem]">{experience}</p>
    </div>
  );
}

function ProjectItem({
  name,
  image,
  imageDesktop,
  technologies,
  codeLink,
  projectLink,
}: {
  name: string;
  image: StaticImageData;
  imageDesktop: StaticImageData;
  technologies: string[];
  codeLink: string;
  projectLink: string;
}) {
  const [isOverlayActive, setIsOverlayActive] = React.useState(false);

  function activateOverlay() {
    setIsOverlayActive(true);
  }

  function deactivateOverlay() {
    setIsOverlayActive(false);
  }

  return (
    <div className="flex flex-col md:basis-[48%] md:w-[48%]">
      <div
        className="relative mb-[1.25rem]"
        onMouseOver={activateOverlay}
        onMouseOut={deactivateOverlay}
        onFocus={activateOverlay}
        onBlur={deactivateOverlay}
      >
        <picture>
          <source media="(min-width:1280px)" srcSet={imageDesktop.src} />
          <Image
            src={image}
            alt={`${name} screenshot`}
            className="w-full h-auto"
          />
        </picture>
        {isOverlayActive && (
          <div className="bg-black bg-opacity-75 z-20 hidden absolute h-full w-full top-0 xl:flex flex-col items-center justify-center">
            <a href={projectLink} className="mb-12">
              <Button>View Project</Button>
            </a>
            <a href={codeLink}>
              <Button>View Code</Button>
            </a>
          </div>
        )}
      </div>
      <p className="text-white text-[1.5rem] font-bold">{name}</p>
      <div className="mt-[0.438rem] mb-[1.25rem] flex items-center gap-[1.125rem] xl:mb-0 2xl:mb-0">
        {technologies.map((technology) => (
          <p key={technology} className="text-gray text-[1.125rem]">
            {technology}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-8 xl:hidden">
        <a href={projectLink}>
          <Button>View Project</Button>
        </a>
        <a href={codeLink}>
          <Button>View Code</Button>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [messageButtonText, setMessageButtonText] =
    React.useState<string>("Send Message");
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    const response = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.ok) {
      form.reset();
      setMessageButtonText("Message Sent!");
    }
  }

  function handleContactMeClick() {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen relative w-full overflow-x-hidden">
      <div className="w-full mx-auto relative max-w-[1440px] xl:px-[10.313rem] 2xl:px-[10.313rem]">
        <header className="text-center text-white w-[154px] mx-auto pt-[1.25rem] md:text-left md:flex md:items-center md:justify-between md:w-full md:px-[1.875rem] md:pt-[1.875rem] xl:px-0 2xl:px-0">
          <p className="font-bold text-2xl tracking-tighter mb-[1.25rem] md:mb-0">
            adamkeyes
          </p>
          <div className="flex items-center justify-between md:gap-8 xl:mr-[1.875rem] 2xl:mr-[1.875rem]">
            {HEADER_LINKS.map(({ href, icon, alt }) => (
              <HeaderLink key={alt} href={href} icon={icon} alt={alt} />
            ))}
          </div>
          <picture className="absolute -z-10 top-0 left-0 right-0 mx-0 md:left-auto xl:right-[10.313rem] 2xl:right-[10.313rem]">
            <source media="(min-width:768px)" srcSet={ImageProfileTablet.src} />
            <source
              media="(min-width:1280px)"
              srcSet={ImageProfileDesktop.src}
            />
            <Image
              src={ImageProfileMobile}
              alt="Adam Keyes photo"
              className="h-[383px] w-[174px] md:h-[600px] md:w-[322px] xl:h-[720px] xl:w-[445px] 2xl:h-[720px] 2xl:w-[445px] mx-auto"
            />
          </picture>
          <Image
            src={PatternRings}
            className="absolute -z-20 top-[7.75rem] left-[-13rem] h-[129px] md:left-auto md:right-[31.438rem] xl:top-[8.313rem] 2xl:top-[8.313rem] xl:right-[63.125rem] 2xl:right-[63.125rem]"
            alt="Pattern of Rings"
          />
          <Image
            src={PatternCircle}
            className="absolute -z-20 top-[15.875rem] left-[19.438rem] md:left-[43.875rem] md:top-[29.438rem] md:-z-10 xl:left-[47.875rem] 2xl:left-[47.875rem] xl:top-[32.563rem] 2xl:top-[32.563rem]"
            alt="White Circle"
          />
        </header>

        <main className="mt-[19.438rem] px-4 md:mt-[8.925rem] md:px-8 xl:px-0 2xl:px-0 xl:mt-[7.938rem] 2xl:mt-[7.938rem]">
          <section className="text-center text-white pb-20 md:max-w-[450px] md:text-left md:pb-[3.75rem] xl:max-w-[706px] 2xl:max-w-[706px] xl:pb-[13.688rem] 2xl:pb-[13.688rem]">
            <h1 className="font-bold text-[2.5rem] tracking-tighter text-white leading-[100%] mb-6 md:text-7xl md:mb-[3.75rem] xl:text-[5.5rem] 2xl:text-[5.5rem]">
              Nice to meet you! I&apos;m{" "}
              <span className="border-b-4 border-green">Adam Keyes</span>.
            </h1>

            <p className="text-gray mb-6 md:max-w-[85%] xl:text-[1.25rem] 2xl:text-[1.25rem] xl:mb-[4.125rem] 2xl:mb-[4.125rem]">
              Based in the UK, I&apos;m a front-end developer passionate about
              building accessible web apps that users love.
            </p>

            <Button onClick={handleContactMeClick}>Contact Me</Button>
          </section>

          <hr className="text-white" />

          <section className="py-10 md:pt-[3.25rem] md:pb-[6.25rem] md:flex md:flex-wrap md:items-center md:gap-y-[3.25rem] xl:pt-[4.5rem] 2xl:pt-[4.5rem] xl:pb-[8.75rem] 2xl:pb-[8.75rem]">
            {TECHNOLOGIES.map(({ name, experience }) => (
              <TechnologyItem key={name} name={name} experience={experience} />
            ))}
          </section>

          <Image
            src={PatternRings}
            // Mobile: Needed to overide top from figma by adding 1 rem
            className="absolute -z-20 top-[81.438rem] left-[11.813rem] h-[129px] md:top-[65.438rem] md:left-[35.625rem] xl:top-[67.313rem] 2xl:top-[67.313rem] xl:left-[71.813rem] 2xl:left-[71.813rem]"
            alt="Pattern of Rings"
          />

          <hr className="text-white md:hidden" />

          <section className="py-20 text-white md:pt-0 md:pb-[6.25rem] xl:pb-[8.688rem] 2xl:pb-[8.688rem]">
            <div className="flex items-start justify-between mb-8 md:items-center md:mb-[3.75rem] xl:mb-20 2xl:mb-20">
              <h2 className="text-[2.5rem] font-bold md:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[5.5rem]">
                Projects
              </h2>
              <Button onClick={handleContactMeClick}>Contact Me</Button>
            </div>

            <div className="flex flex-col gap-10 md:flex-row md:flex-wrap md:gap-x-[1.25rem] md:justify-between xl:gap-x-[1.875rem] 2xl:gap-x-[1.875rem] xl:gap-y-[4.313rem] 2xl:gap-y-[4.313rem]">
              {PROJECTS.map((project) => (
                <ProjectItem key={project.name} {...project} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="px-4 py-[3.75rem] bg-dark-gray md:px-8 md:pt-0 md:pb-[2.5rem]  xl:px-0 2xl:px-0 xl:pt-[5.25rem] 2xl:pt-[5.25rem] relative">
        <div className="w-full mx-auto max-w-[1440px] xl:px-[10.313rem] 2xl:px-[10.313rem]">
          <div className="xl:flex xl:items-start xl:justify-between">
            <div className="text-center mb-[3.125rem] md:pt-[3.75rem] md:px-[8.125rem] xl:px-0 2xl:px-0 xl:py-0 2xl:py-0 xl:mb-0 2xl:mb-0 xl:w-[445px] 2xl:w-[445px]">
              <h3 className="text-white text-[2.5rem] font-bold mb-[1.25rem] md:text-7xl xl:mb-[2.25rem] 2xl:mb-[2.25rem] xl:text-[5.5rem] 2xl:text-[5.5rem]">
                Contact
              </h3>
              <p className="text-gray md:text-[1.25rem]">
                I would love to hear about your project and how I could help.
                Please fill in the form, and I&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="md:px-[8.125rem] xl:px-0 2xl:px-0 xl:w-[445px] 2xl:w-[445px]"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          error={!!form.formState.errors?.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          error={!!form.formState.errors?.email}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          className={cn(
                            "flex h-[107px] w-full resize-none text-white placeholder:text-gray bg-transparent text-base pt-0 pl-6 border-b border-white focus:outline-none focus:border-green uppercase",
                            form.formState.errors?.message &&
                              "border-red focus:border-red"
                          )}
                          placeholder="Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mb-[5.438rem] flex flex-row-reverse">
                  <Button type="submit">{messageButtonText}</Button>
                </div>
              </form>
            </Form>
          </div>

          <hr className="text-white" />

          <div className="text-center text-white w-[154px] mx-auto mt-10 md:text-left md:flex md:items-center md:justify-between md:w-full md:px-[1.875rem] md:pt-[1.875rem] md:mt-0">
            <p className="font-bold text-2xl tracking-tighter mb-[1.25rem] md:mb-0">
              adamkeyes
            </p>
            <div className="flex items-center justify-between md:gap-8">
              {HEADER_LINKS.map(({ href, icon, alt }) => (
                <HeaderLink key={alt} href={href} icon={icon} alt={alt} />
              ))}
            </div>
          </div>

          <Image
            src={PatternRings}
            className="absolute bottom-[17.313rem] left-[-13rem] h-[129px] md:bottom-[8.125rem] md:left-auto md:right-[37.875rem] xl:right-[69.688rem] 2xl:right-[69.688rem]"
            alt="Pattern of Rings"
          />
        </div>
      </footer>
    </div>
  );
}
