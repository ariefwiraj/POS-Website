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
        scale: 3, // Skala tinggi agar karakter font mono tidak pecah/blur saat dibakar head printer
        backgroundColor: '#ffffff',
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedReceipt = clonedDoc.getElementById('print-receipt')
          if (clonedReceipt) {
            clonedReceipt.style.margin = '0'
            clonedReceipt.style.position = 'fixed'
            clonedReceipt.style.top = '0'
            clonedReceipt.style.left = '0'
            clonedReceipt.style.boxShadow = 'none' // Hilangkan shadow agar tidak menghasilkan siluet abu-abu saat di-print
          }
        }
      })

      const imgData = canvas.toDataURL('image/png')
      
      // Lebar total kertas 58mm = 164.4 pt
      const pdfWidth = 164.4
      
      // 👇 SOLUSI MEPOET: Berikan margin pengaman kiri & kanan (12pt = ~4.2mm)
      const marginX = 12 
      const printableWidth = pdfWidth - (2 * marginX) // Area yang benar-benar akan digambari struktur struk
      
      // Hitung tinggi secara proporsional berdasarkan area cetak aktif
      const pdfHeight = (canvas.height * printableWidth) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [pdfWidth, pdfHeight] // Ukuran kertas total tetap standar 58mm
      })

      // 👇 Masukkan gambar dengan posisi X bergeser sejauh marginX (tidak menempel di 0)
      pdf.addImage(imgData, 'PNG', marginX, 0, printableWidth, pdfHeight)
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