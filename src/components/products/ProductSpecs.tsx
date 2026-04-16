import ScrollReveal from "@/components/animations/ScrollReveal"

interface ProductSpecsProps {
  specs: Record<string, string>
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const entries = Object.entries(specs)

  if (entries.length === 0) return null

  return (
    <ScrollReveal variant="fadeUp">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th
                colSpan={2}
                className="px-4 py-3 text-left font-playfair text-base font-bold text-ace-charcoal bg-gray-50 border-b border-gray-200"
              >
                Specifications
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value], index) => (
              <tr
                key={key}
                className={
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }
              >
                <td className="px-4 py-3 font-semibold text-ace-charcoal w-2/5 border-r border-gray-100">
                  {key}
                </td>
                <td className="px-4 py-3 text-ace-slate">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  )
}
