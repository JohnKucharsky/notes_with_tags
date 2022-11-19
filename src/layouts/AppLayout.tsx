import { Outlet, useOutletContext } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import React, { useMemo } from 'react'
import { ContextType, NoteData, RawNote, Tag } from '../shared/types/types'
import { useLocalStorage } from '../shared/hooks/useLocalStorage'
import { v4 as uuidV4 } from 'uuid'

export function useAppLayoutContext() {
    return useOutletContext<ContextType>()
}

export default function AppLayout() {
    const [notes, setNotes] = useLocalStorage<RawNote[]>('notes', [])
    const [tags, setTags] = useLocalStorage<Tag[]>('tags', [])

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
            }
        })
    }, [notes, tags])

    function onCreateNote(data: NoteData) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes,
                {
                    ...data,
                    id: uuidV4(),
                    tagIds: data.tags.map((tag) => tag.id),
                },
            ]
        })
    }

    function onUpdateNote(id: string, data: NoteData) {
        setNotes((prevNotes) => {
            return prevNotes?.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: data.tags?.map((tag) => tag.id),
                    }
                } else {
                    return note
                }
            })
        })
    }

    function onDeleteNote(id: string) {
        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id)
        })
    }

    function addTag(tag: Tag) {
        setTags((prev) => [...prev, tag])
    }

    function updateTag(id: string, label: string) {
        setTags((prevTags) => {
            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, label }
                } else {
                    return tag
                }
            })
        })
    }

    function deleteTag(id: string) {
        setTags((prevTags) => {
            return prevTags.filter((tag) => tag.id !== id)
        })
    }

    return (
        <Container className="my-4">
            <Outlet
                context={{
                    onCreateNote,
                    addTag,
                    tags,
                    notesWithTags,
                    onUpdateNote,
                    onDeleteNote,
                    updateTag,
                    deleteTag,
                }}
            />
        </Container>
    )
}
