'use client'

import { useState } from 'react'

export function useReceiptPdf() {
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadPdf = async (elementRef: React.RefObject<HTMLElement | null>, filename: string) => {
    if (!elementRef.current) return

    try {
      setIsGenerating(true)
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(elementRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      
      // 58mm is ~164.4pt
      const pdfWidth = 164.4
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pdfWidth, pdfHeight]
      })

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(filename)
      
    } catch (error) {
      console.error('Failed to generate PDF', error)
      alert('Gagal membuat PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  return { downloadPdf, isGenerating }
}
