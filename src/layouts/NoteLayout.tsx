import { useAppLayoutContext } from './AppLayout'
import { Navigate, Outlet, useParams } from 'react-router-dom'

export function NoteLayout() {
    const {
        notesWithTags,
        onCreateNote,
        addTag,
        tags,
        onUpdateNote,
        onDeleteNote,
    } = useAppLayoutContext()
    const { id } = useParams()
    const note = notesWithTags.find((n) => n.id === id)
    if (!note) return <Navigate to={'/'} replace />

    return (
        <Outlet
            context={{
                note,
                onCreateNote,
                addTag,
                tags,
                onUpdateNote,
                onDeleteNote,
            }}
        />
    )
}
