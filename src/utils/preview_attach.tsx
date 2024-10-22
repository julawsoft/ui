export function previewAttachments(attach: string) {
    let apiStaticFiles = import.meta.env.VITE_URL_PREVIEW_DOC
    return `${apiStaticFiles}/${attach}`
}