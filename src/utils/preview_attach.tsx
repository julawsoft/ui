export function previewAttachments(attach: string) {
    const apiStaticFiles = import.meta.env.VITE_URL_PREVIEW_DOC
    return `${apiStaticFiles}/${attach}`
}