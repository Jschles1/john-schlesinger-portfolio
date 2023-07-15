"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
    <div className="flex flex-col items-center mb-6 last:mb-0">
      <p className="text-white text-[2rem] font-bold">{name}</p>
      <p className="text-gray">{experience}</p>
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
  return (
    <div className="flex flex-col">
      <div className="relative mb-[1.25rem]">
        <picture>
          <source media="(min-width:1280px)" srcSet={imageDesktop.src} />
          <Image
            src={image}
            alt={`${name} screenshot`}
            className="w-full h-auto"
          />
        </picture>
      </div>
      <p className="text-white text-[1.5rem] font-bold">{name}</p>
      <div className="mt-[0.438rem] mb-[1.25rem] flex items-center gap-[1.125rem]">
        {technologies.map((technology) => (
          <p key={technology} className="text-gray text-[1.125rem]">
            {technology}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-8">
        <a href={projectLink}>
          <Button>View Project</Button>
        </a>
        <a href={codeLink}>
          <Button>View Project</Button>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: FormSchema) {
    // No requirements for submitting form successfully, so just log values
    console.log(values);
  }

  return (
    <div className="flex flex-col min-h-screen relative w-full mx-auto max-w-[1440px]">
      <header className="text-center text-white w-[154px] mx-auto pt-[1.25rem]">
        <p className="font-bold text-2xl tracking-tighter mb-[1.25rem]">
          adamkeyes
        </p>
        <div className="flex items-center justify-between">
          {HEADER_LINKS.map(({ href, icon, alt }) => (
            <HeaderLink key={alt} href={href} icon={icon} alt={alt} />
          ))}
        </div>
        <picture className="absolute -z-10 top-0 left-0 right-0 mx-0">
          <source media="(min-width:768px)" srcSet={ImageProfileTablet.src} />
          <source media="(min-width:1280px)" srcSet={ImageProfileDesktop.src} />
          <Image
            src={ImageProfileMobile}
            alt="Adam Keyes photo"
            className="h-[383px] w-[174px] mx-auto"
          />
        </picture>
        <Image
          src={PatternRings}
          className="absolute -z-20 top-[7.75rem] left-[-13rem] h-[129px]"
          alt="Pattern of Rings"
        />
        <Image
          src={PatternCircle}
          className="absolute -z-20 top-[15.875rem] left-[19.438rem]"
          alt="White Circle"
        />
      </header>
      <main className="mt-[19.438rem] px-4">
        <section className="text-center text-white pb-20">
          <h1 className="text-bold text-[2.5rem] text-white leading-[100%] mb-6">
            Nice to meet you! I&apos;m{" "}
            <span className="border-b-4 border-green">Adam Keyes.</span>
          </h1>

          <p className="text-gray mb-6">
            Based in the UK, I&apos;m a front-end developer passionate about
            building accessible web apps that users love.
          </p>

          <Button>Contact Me</Button>
        </section>

        <hr className="text-white" />

        <section className="py-10">
          {TECHNOLOGIES.map(({ name, experience }) => (
            <TechnologyItem key={name} name={name} experience={experience} />
          ))}
        </section>

        <Image
          src={PatternRings}
          // Needed to overide top from figma by adding 1 rem
          className="absolute -z-20 top-[81.438rem] left-[11.813rem] h-[129px]"
          alt="Pattern of Rings"
        />

        <hr className="text-white" />

        <section className="py-20 text-white">
          <div className="flex items-start justify-between mb-8">
            <h2 className="text-[2.5rem] font-bold">Projects</h2>
            <Button>Contact Me</Button>
          </div>

          <div className="flex flex-col gap-10">
            {PROJECTS.map((project) => (
              <ProjectItem key={project.name} {...project} />
            ))}
          </div>
        </section>
      </main>
      <footer className="px-4 py-[3.75rem] bg-dark-gray">
        <div className="text-center mb-[3.125rem]">
          <h3 className="text-white text-[2.5rem] font-bold mb-[1.25rem]">
            Contact
          </h3>
          <p className="text-gray">
            I would love to hear about your project and how I could help. Please
            fill in the form, and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </Form>

        <hr className="text-white" />

        <div className="text-center text-white w-[154px] mx-auto mt-10">
          <p className="font-bold text-2xl tracking-tighter mb-[1.25rem]">
            adamkeyes
          </p>
          <div className="flex items-center justify-between">
            {HEADER_LINKS.map(({ href, icon, alt }) => (
              <HeaderLink key={alt} href={href} icon={icon} alt={alt} />
            ))}
          </div>
        </div>

        <Image
          src={PatternRings}
          className="absolute bottom-[17.313rem] left-[-13rem] h-[129px]"
          alt="Pattern of Rings"
        />
      </footer>
    </div>
  );
}
