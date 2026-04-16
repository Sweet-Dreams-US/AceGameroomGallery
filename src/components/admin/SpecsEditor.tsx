"use client"

import { Plus, Trash2 } from "lucide-react"

interface SpecsEditorProps {
  value: Record<string, string>
  onChange: (specs: Record<string, string>) => void
}

export default function SpecsEditor({ value, onChange }: SpecsEditorProps) {
  const entries = Object.entries(value)

  const handleKeyChange = (oldKey: string, newKey: string) => {
    const newSpecs: Record<string, string> = {}
    for (const [k, v] of entries) {
      if (k === oldKey) {
        newSpecs[newKey] = v
      } else {
        newSpecs[k] = v
      }
    }
    onChange(newSpecs)
  }

  const handleValueChange = (key: string, newValue: string) => {
    onChange({ ...value, [key]: newValue })
  }

  const handleDelete = (key: string) => {
    const newSpecs = { ...value }
    delete newSpecs[key]
    onChange(newSpecs)
  }

  const handleAdd = () => {
    const key = `Spec ${entries.length + 1}`
    onChange({ ...value, [key]: "" })
  }

  return (
    <div className="space-y-3">
      {entries.length > 0 && (
        <div className="space-y-2">
          {entries.map(([key, val], index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => handleKeyChange(key, e.target.value)}
                placeholder="Specification name"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
              />
              <input
                type="text"
                value={val}
                onChange={(e) => handleValueChange(key, e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ace-cyan/30 focus:border-ace-cyan"
              />
              <button
                type="button"
                onClick={() => handleDelete(key)}
                className="p-2 text-gray-400 hover:text-ace-red transition-colors rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 text-sm text-ace-cyan hover:text-ace-cyan/80 font-medium transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Specification
      </button>
    </div>
  )
}
