namespace gaChildme.Client.Models
{
    public class PuzzlePiece
    {
        public int Id { get; set; }
        public string ImageData { get; set; } = string.Empty;
        public int CorrectIndex { get; set; }
    }

    public class ImageOption
    {
        public string Name { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
    }

    public class PuzzleSize
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public string Difficulty { get; set; } = string.Empty;
    }
}
