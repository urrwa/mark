import StudioPage from "./studio/StudioPage";
import { LanguageProvider } from "./studio/Language";
export default function App() {
  return <LanguageProvider><StudioPage /></LanguageProvider>;
}
