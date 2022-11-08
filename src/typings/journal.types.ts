export type JournalProps = {
    id: number,
    title: string,
    user_id: number,
    created_at: string,
    updated_at: string,
    comments: [],
    body: Body,
};

export type Body = {
    id: number,
    name: string,
    body: string,
    record_type: string,
    record_id: number,
    created_at: string,
    updated_at: string,
}

export type AddJournalProps = {
    title: string,
    body: string,
}

export type EditJournalProps = {
    title: string,
    body: string,
}

export type JournalCommentProps = {
    id: number,
    title: string,
    user_id: number,
    journal_id: number,
    created_at: string,
    updated_at: string,
    status: null,
}

export type AddJournalCommentProps = {
    title: string,
}

export type EditJournalCommentProps = {
    title: string,
}