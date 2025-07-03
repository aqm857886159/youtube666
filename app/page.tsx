import { HeroSection } from "./_sections/hero"
import { ValueProposition } from "./_sections/value-proposition"
import { OutputFormats } from "./_sections/output-formats"
import { UseCases } from "./_sections/use-cases"
import { PricingSection } from "./_sections/pricing"
import { ConversionForm } from "./_sections/conversion-form"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ValueProposition />
      <OutputFormats />
      <UseCases />
      <PricingSection />
      <ConversionForm />
    </div>
  )
}