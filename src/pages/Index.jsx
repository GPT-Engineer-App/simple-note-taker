import { useState } from "react";
import { Container, VStack, HStack, Input, Textarea, Button, Box, Heading, IconButton, Text } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const handleAddNote = () => {
    if (isEditing) {
      const updatedNotes = notes.map((note, index) => (index === editIndex ? currentNote : note));
      setNotes(updatedNotes);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setNotes([...notes, currentNote]);
    }
    setCurrentNote({ title: "", content: "" });
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Note-Taking App
        </Heading>
        <Input placeholder="Title" name="title" value={currentNote.title} onChange={handleInputChange} />
        <Textarea placeholder="Content" name="content" value={currentNote.content} onChange={handleInputChange} />
        <Button onClick={handleAddNote} colorScheme="teal" width="100%">
          {isEditing ? "Save Note" : "Add Note"}
        </Button>
        <VStack spacing={4} width="100%">
          {notes.map((note, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <HStack justifyContent="space-between">
                <Heading as="h3" size="md">
                  {note.title}
                </Heading>
                <HStack>
                  <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditNote(index)} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteNote(index)} />
                </HStack>
              </HStack>
              <Text mt={2}>{note.content}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
