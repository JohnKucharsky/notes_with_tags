import { FormEvent, useRef, useState } from 'react'
import { useAppLayoutContext } from '../../layouts/AppLayout'
import { Tag } from '../../shared/types/types'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import { v4 as uuidV4 } from 'uuid'

export function NewAndEditNote({ edit }: { edit?: boolean }) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const { onCreateNote, addTag, tags, onUpdateNote, note } =
        useAppLayoutContext()

    const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags || [])
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (edit) {
            onUpdateNote(note?.id, {
                title: titleRef.current!.value,
                markdown: markdownRef.current!.value,
                tags: selectedTags,
            })
        } else {
            onCreateNote({
                title: titleRef.current!.value,
                markdown: markdownRef.current!.value,
                tags: selectedTags,
            })
        }

        navigate('..')
    }
    return (
        <>
            <h1 className="mb-4">{edit ? 'Edit' : 'New'} Note</h1>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    defaultValue={note?.title || ''}
                                    ref={titleRef}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label>Tags</Form.Label>
                                <CreatableSelect
                                    onCreateOption={(label) => {
                                        const newTag = { id: uuidV4(), label }
                                        addTag(newTag)
                                        setSelectedTags((prev) => [
                                            ...prev,
                                            newTag,
                                        ])
                                    }}
                                    value={selectedTags.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        }
                                    })}
                                    options={tags?.map((tag) => {
                                        return {
                                            label: tag.label,
                                            value: tag.id,
                                        }
                                    })}
                                    onChange={(tags) => {
                                        setSelectedTags(
                                            tags.map((tag) => {
                                                return {
                                                    label: tag.label,
                                                    id: tag.value,
                                                }
                                            })
                                        )
                                    }}
                                    isMulti
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            defaultValue={note?.markdown || ''}
                            ref={markdownRef}
                            required
                            as={'textarea'}
                            rows={15}
                        />
                    </Form.Group>
                    <Stack
                        direction={'horizontal'}
                        gap={3}
                        className={'justify-content-end'}
                    >
                        <Button type={'submit'} variant={'primary'}>
                            Save
                        </Button>
                        <Link to={'..'}>
                            <Button
                                type={'button'}
                                variant={'outline-secondary'}
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Form>
        </>
    )
}
