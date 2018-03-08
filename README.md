# react-gallery

Some component I wan to share between my projects. 

`
<Gallery staticUrl={"http://files.yourdomain.com/subfolder/"} title={"Title of the gallery"} photos={photos}/>
`

The object `photos` must have this structure :

```json
{
  "name": "Name of album",
  "files": [
    {
      "path": "path/of/image.jpg",
      "author": "Author name",
      "src": {
        "thumb": "path/to/thumb.jpg",
        "1920x1080": "path/to/other/size.jpg"
      },
      "size": 3.905281,
      "birthtime": "2018-03-02T23:09:40.931Z",
      "type": "JPG"
    }
  ]
}
```

Only 1 <Gallery> per page is allowed (because of `document.addEventListener`)
