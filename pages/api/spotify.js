const {
  MY_SPOTIFY_CLIENT_ID: client_id,
  MY_SPOTIFY_CLIENT_SECRET: client_secret,
  MY_SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
  return response.json()
}

export const getNowPlaying = async () => {
  const result = await getAccessToken()
  const access_token = result.access_token

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export default async (req, res) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const audio = await response.json()
  //const artist = audio.item.artists.map((_artist) => _artist.name).join(", ")

  let album = ""
  let isPlaying = ""
  let title = ""
  let albumImageUrl = ""
  let trackUrl = ""
  let audioType = audio.currently_playing_type
  //const artist = audio.item.artists.map((_artist) => _artist.name).join(", ")

  if (audio.currently_playing_type === "track") {
    album = audio.item.album.name
    isPlaying = audio.is_playing
    title = audio.item.name
    albumImageUrl = audio.item.album.images[0].url
    trackUrl = audio.item.external_urls.spotify
  } else if (audio.currently_playing_type === "episode") {
    album = audio.item.show.name
    isPlaying = audio.is_playing
    title = audio.item.name
    albumImageUrl = audio.item.show.images[0].url
    trackUrl = audio.item.external_urls.spotify
  }

  return res.status(200).json({
    album,
    albumImageUrl,
    isPlaying,
    trackUrl,
    title,
    audioType,
  })
}
