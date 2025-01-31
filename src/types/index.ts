export interface UserSignIn {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLogIn {
    email: string;
    password: string;
}

export type Note = {
    id: string
  } & NoteData
  
  export type RawNote = {
    id: string
  } & RawNoteData
  
  export type RawNoteData = {
    title: string
    body: string
    tagIds: string[]
  }
  
  export type NoteData = {
    title: string
    body: string
    tags: Tag[]
  }
  
  export type Tag = {
    id: string
    label: string
  }

  export type CardNote = {
    tags: Tag[];
    title: string;
    id: string;
  };