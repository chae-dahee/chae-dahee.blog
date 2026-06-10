// CSS 파일 임포트 타입 선언 (Next.js next-env.d.ts 미생성 환경 대응)
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
