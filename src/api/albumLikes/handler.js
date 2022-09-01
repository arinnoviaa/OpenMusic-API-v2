/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

class AlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const albumId = id;
    const { id: credentialId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);

    const checkLikeStatus = await this._service.checkLikeStatus(credentialId, albumId);

    if (!checkLikeStatus) {
      const likeId = await this._service.addAlbumLike(credentialId, albumId);

      const response = h.response({
        status: 'success',
        message: `Berhasil melakukan like pada album dengan id: ${likeId}`,
      });
      response.code(201);
      return response;
    }

    await this._service.deleteAlbumLike(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan unlike',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikesHandler(request, h) {
    const { id } = request.params;
    const albumId = id;

    const data = await this._service.getLikesCount(albumId);
    const likes = data.count;

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.header('X-Data-Source', data.source);
    response.code(200);
    return response;
  }
}

module.exports = AlbumLikesHandler;
