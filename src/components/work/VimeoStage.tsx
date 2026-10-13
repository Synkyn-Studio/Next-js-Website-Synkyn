/*
  Server-rendered Vimeo player with the site's custom controls (same markup as
  the Library modal; wired by behaviors/work.ts). The iframe is in the HTML, so
  the film is discoverable without interaction.
*/

export default function VimeoStage({ id, title, eager }: { id: string; title: string; eager: boolean }) {
  return (
    <div className="vmo-stage">
      <iframe
        className="vmo-frame"
        src={`https://player.vimeo.com/video/${id}?controls=0&loop=1&autoplay=0&dnt=1&title=0&byline=0&portrait=0&badge=0&playsinline=1&autopause=0`}
        title={`${title} — video`}
        frameBorder="0"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        loading={eager ? "eager" : "lazy"}
      />
      <button className="vmo-click" type="button" aria-label={`Play ${title}`}>
        <span className="vmo-big-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 4.4v15.2c0 .8.9 1.3 1.6.9l11.8-7.6c.6-.4.6-1.4 0-1.8L6.6 3.5C5.9 3.1 5 3.6 5 4.4z" /></svg>
        </span>
      </button>
      <div className="vmo-controls" role="group" aria-label="Video controls">
        <button className="vmo-btn vmo-play" type="button" aria-label="Play" />
        <div className="vmo-progress" role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} tabIndex={0}>
          <div className="vmo-track"><div className="vmo-buffered" /><div className="vmo-played" /></div>
          <div className="vmo-thumb" />
        </div>
        <span className="vmo-time">0:00&nbsp;/&nbsp;0:00</span>
        <button className="vmo-btn vmo-mute" type="button" aria-label="Mute" />
        <button className="vmo-btn vmo-fs" type="button" aria-label="Fullscreen" />
      </div>
    </div>
  );
}
