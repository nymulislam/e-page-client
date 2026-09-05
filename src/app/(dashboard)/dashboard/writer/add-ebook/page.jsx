"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Image as ImageIcon, Loader2 } from "lucide-react";
import { Select, ListBox, Label, TextField, InputGroup, TextArea, Surface } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";

const categories = ["Technology", "Literature", "History", "Science", "Poetry", "Islamic", "Mystery"];
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 

// onSuccess 
export default function AddEBook({ ebookId, onSuccess }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ title: "", price: "", description: "" });

    useEffect(() => {
        if (ebookId) {
            fetch(`http://localhost:5000/ebooks/${ebookId}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({ title: data.title, price: data.price, description: data.description });
                    setSelectedGenre(data.genre);
                    setPreviewImage(data.cover);
                });
        }
    }, [ebookId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let coverImageUrl = previewImage; 
        if (imageFile) {
            const imgData = new FormData();
            imgData.append("image", imageFile);
            try {
                const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: imgData,
                });
                const imgJson = await imgRes.json();
                if (imgJson.success) {
                    coverImageUrl = imgJson.data.display_url;
                }
            } catch (error) {
                console.error("Image Upload Failed", error);
                setIsLoading(false);
                return;
            }
        }

        const ebookData = {
            title: formData.title,
            price: parseFloat(formData.price),
            description: formData.description,
            genre: selectedGenre,
            cover: coverImageUrl,
            writer: session?.user?.name,
            writerEmail: session?.user?.email,
        };

        //
        if (!ebookId) {
            ebookData.isSold = false; 
        }

        try {
            const url = ebookId
                ? `http://localhost:5000/ebooks/${ebookId}`
                : `http://localhost:5000/ebooks`;

            const method = ebookId ? "PATCH" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ebookData),
            });

            if (response.ok) {
                if (onSuccess) {
                    onSuccess(); // মডালের ভেতরে থাকলে এটি কল হবে
                } else {
                    router.push("/dashboard/writer/manage-ebooks");
                }
            }
        } catch (error) {
            console.error("Failed to save ebook", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-serif text-amber-950 tracking-tight">
                    {ebookId ? "Edit Ebook" : "Publish New Ebook"}
                </h1>
            </div>

            <Surface className="p-6 md:p-8 rounded-3xl bg-white border border-amber-900/10 shadow-sm space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <TextField className="w-full" name="title" value={formData.title} onChange={(val) => setFormData({ ...formData, title: val })} isRequired>
                                <Label className="text-sm font-semibold text-amber-950 block mb-2">Book Title</Label>
                                <InputGroup className="w-full focus-within:ring-4 focus-within:ring-amber-600/10">
                                    <InputGroup.Input className="w-full px-4 py-3.5 bg-[#FDFBF7] focus:outline-none" />
                                </InputGroup>
                            </TextField>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField className="w-full" name="price" value={formData.price} onChange={(val) => setFormData({ ...formData, price: val })} isRequired>
                                    <Label className="text-sm font-semibold text-amber-950 block mb-2">Price ($)</Label>
                                    <InputGroup className="w-full focus-within:ring-4 focus-within:ring-amber-600/10">
                                        <InputGroup.Prefix className="px-4 border-r border-amber-900/10">$</InputGroup.Prefix>
                                        <InputGroup.Input type="number" step="0.01" className="w-full px-4 py-3.5 bg-[#FDFBF7] focus:outline-none" />
                                    </InputGroup>
                                </TextField>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-amber-950 block mb-2">Genre / Category</Label>
                                    <Select selectedKeys={selectedGenre ? new Set([selectedGenre]) : new Set()} onSelectionChange={(keys) => setSelectedGenre(Array.from(keys)[0] || "")}>
                                        <Select.Trigger className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm focus:outline-none">
                                            <Select.Value placeholder="Select a genre" />
                                        </Select.Trigger>
                                        <Select.Popover className="bg-white border rounded-xl shadow-xl mt-2 p-1.5 z-50">
                                            <ListBox>
                                                {categories.map((cat) => (
                                                    <ListBox.Item key={cat} id={cat} textValue={cat} className="px-3 py-2.5 text-sm hover:bg-amber-50 rounded-lg cursor-pointer">
                                                        {cat}
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 lg:col-span-1">
                            <Label className="text-sm font-semibold text-amber-950 block mb-2">Cover Image</Label>
                            <div className="relative h-[220px] w-full border-2 border-dashed border-amber-900/20 rounded-2xl bg-[#FDFBF7] flex flex-col items-center justify-center overflow-hidden group">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                            <label className="px-4 py-2 bg-white text-sm font-semibold rounded-lg cursor-pointer shadow-lg hover:bg-gray-100">
                                                Change Image
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4">
                                        <ImageIcon size={24} className="text-amber-700 mb-2" />
                                        <span className="text-sm font-medium">Upload Cover</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!ebookId} />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    <TextField className="w-full" name="description" value={formData.description} onChange={(val) => setFormData({ ...formData, description: val })} isRequired>
                        <Label className="text-sm font-semibold text-amber-950 block mb-2">Full Description</Label>
                        <TextArea rows={6} className="w-full px-4 py-4 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm focus:outline-none focus:border-amber-600" />
                    </TextField>

                    <div className="pt-4 flex justify-end border-t border-amber-900/5">
                        <button type="submit" disabled={isLoading} className="w-full md:w-auto px-10 flex items-center justify-center gap-2 py-3.5 bg-amber-900 text-white rounded-xl text-sm font-semibold hover:bg-amber-950 transition-all disabled:opacity-70">
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <PlusCircle size={18} />}
                            {isLoading ? "Saving..." : ebookId ? "Update Ebook" : "Publish Ebook"}
                        </button>
                    </div>
                </form>
            </Surface>
        </div>
    );
}