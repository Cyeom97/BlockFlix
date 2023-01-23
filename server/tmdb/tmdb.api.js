import axiosClient from '../axios/axiosClient'
import tmdbEndpoints from './tmdb.endpoints'

const tmdbApi = () => {
  mediaList = async ({ mediaType, mediaCategory, page }) => {
    const url = tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    const mediaListResponse = await axiosClient.get(url)
    return mediaListResponse
  }
  mediaDetail = async ({ mediaType, page }) => {
    const url = tmdbEndpoints.mediaDetail({ mediaType, page })
    const mediaDetailResponse = await axiosClient.get(url)
    return mediaDetailResponse
  }
  mediaGenres = async ({ mediaType }) => {
    const url = tmdbEndpoints.mediaGenres({ mediaType })
    const mediaGenresResponse = await axiosClient.get(url)
    return mediaGenresResponse
  }
  mediaCredits = async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    const mediaCreditsResponse = await axiosClient.get(url)
    return mediaCreditsResponse
  }
  mediaVideos = async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaVideos({ mediaType, mediaId })
    const mediaVideosResponse = await axiosClient.get(url)
    return mediaVideosResponse
  }
  mediaImages = async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaImages({ mediaType, mediaId })
    const mediaImagesResponse = await axiosClient.get(url)
    return mediaImagesResponse
  }
  mediaRecommendations = async ({ mediaType, mediaId }) => {
    const url = tmdbEndpoints.mediaRecommendations({ mediaType, mediaId })
    const mediaRecommendationsResponse = await axiosClient.get(url)
    return mediaRecommendationsResponse
  }
  mediaSearch = async ({ mediaType, query, page }) => {
    const url = tmdbEndpoints.mediaSearch({ mediaType, query, page })
    const mediaSearchResponse = await axiosClient.get(url)
    return mediaSearchResponse
  }
  personDetail = async ({ personId }) => {
    const url = tmdbEndpoints.personDetail({ personId })
    const personDetailResponse = await axiosClient.get(url)
    return personDetailResponse
  }
  personMedias = async ({ personId }) => {
    const url = tmdbEndpoints.personMedias({ personId })
    const personMediasResponse = await axiosClient.get(url)
    return personMediasResponse
  }
}
export default tmdbApi
