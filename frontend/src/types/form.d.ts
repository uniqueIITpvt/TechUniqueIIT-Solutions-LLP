interface CustomFormData extends FormData {
  entries(): IterableIterator<[string, string | Blob]>;
} 