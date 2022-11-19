export interface Note extends NoteData {
    id: string
}

export interface RawNote extends RawNoteData {
    id: string
}

interface Data {
    title: string
    markdown: string
}

export interface RawNoteData extends Data {
    tagIds: string[]
}

export interface NoteData extends Data {
    tags: Tag[]
}

export interface Tag {
    id: string
    label: string
}

export type ContextType = {
    onCreateNote: (data: NoteData) => void
    addTag: (tag: Tag) => void
    tags: Tag[]
    notesWithTags: Note[]
    onUpdateNote: (id: string, data: NoteData) => void
    note: Note
    onDeleteNote: (id: string) => void
    updateTag: (id: string, label: string) => void
    deleteTag: (id: string) => void
}
