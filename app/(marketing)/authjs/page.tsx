import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Auth.js
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Authentication for the Web.
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Open Source.
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Full Stack.
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Own Your Data.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={"https://authjs.dev"}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
      </div>
    </section>
    
  )
}
