// 1) Get масиву фільмів у локал сторедж
export default function getArrQueueWithLocalStorage() {
  try {
    const serializedState = localStorage.getItem('FilmsArrQueue');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
