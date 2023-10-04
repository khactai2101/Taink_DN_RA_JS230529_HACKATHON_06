import { RiStickyNoteFill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteName, setNewNoteName] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/notes").then((response) => {
      setNotes(response.data);
    });
  }, [render]);

  const handleInputChange = (event) => {
    setNewNoteName(event.target.value);
  };

  const addNote = async () => {
    if (newNoteName.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/notes",
          {
            title: newNoteName,
          }
        );
        setNotes([...notes, response.data]);
        setNewNoteName("");
        setRender(!render);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/notes/${noteId}`);
      setRender(!render);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-400 h-full w-full pb-7">
      <h1 className="h-full bg-yellow-500 text-center py-6 text-3xl text-white">
        Note App
      </h1>
      <form className="text-center my-9 relative">
        <input
          type="text"
          placeholder="Add a note"
          className="h-[100px] w-2/6 border-2 border-slate-400"
          value={newNoteName}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="px-3 py-1 bg-yellow-500 rounded-full absolute bottom-[-15px] right-[503px]"
          onClick={addNote}
        >
          +
        </button>
      </form>
      <div className="mx-[80px]  bg-slate-400 gap-4">
        <div className="text-center my-3">
          <div className="grid grid-cols-4 gap-4">
            {notes.map((note) => {
              return (
                <div
                  key={note.id}
                  className="w-full bg-white h-[30px]  flex items-center justify-between py-4 my-4"
                >
                  <p className="mx-2">{note.title}</p>
                  <div className="flex gap-4 mx-2">
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="bg-yellow-500  p-1 rounded-full"
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
