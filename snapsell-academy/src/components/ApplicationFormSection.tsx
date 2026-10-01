import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { FORM_ENDPOINT } from '../data/agencyData';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  instagram: string;
  level: string;
  goal: string;
  ageConfirmed: boolean;
  privacyConfirmed: boolean;
  website: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  instagram: '',
  level: '',
  goal: '',
  ageConfirmed: false,
  privacyConfirmed: false,
  website: '',
};

const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#111417',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '6px',
  padding: '0.85rem 1rem',
  color: '#F5F5F2',
  fontFamily: "'Manrope', sans-serif",
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  appearance: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 500,
  fontSize: '0.85rem',
  color: '#A5A5A5',
  marginBottom: '0.5rem',
  letterSpacing: '0.02em',
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const ApplicationFormSection: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const isPreview = !FORM_ENDPOINT;

  const borderFor = (field: string): React.CSSProperties => ({
    borderColor: focusedField === field ? '#00D084' : 'rgba(255,255,255,0.1)',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.website.trim() !== '') {
      return;
    }

    if (submittingRef.current) return;

    if (isPreview) {
      setStatus('success');
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');

    try {
      const payload = {
        name: form.name,
        email: form.email,
        instagram: form.instagram,
        level: form.level,
        goal: form.goal,
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Server error');
      setStatus('success');
    } catch {
      setStatus('error');
      submittingRef.current = false;
    }
  };

  return (
    <section
      id="bewerbung"
      style={{
        backgroundColor: '#050505',
        scrollMarginTop: '80px',
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '0.78rem',
              color: '#A5A5A5',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            (07) BEWERBUNG
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
            }}
          >
            Bereit für den nächsten Schritt?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
              color: '#A5A5A5',
              lineHeight: 1.65,
              marginBottom: '3rem',
            }}
          >
            Bewirb dich jetzt für die Mark Aurel Creator Agency.
          </motion.p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: '#111417',
                border: '1px solid rgba(0,208,132,0.3)',
                borderRadius: '10px',
                padding: '2.5rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: '#00D084',
                  marginBottom: '0.75rem',
                }}
              >
                Bewerbung eingegangen ✓
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.95rem',
                  color: '#A5A5A5',
                }}
              >
                {isPreview
                  ? 'Wir melden uns in Kürze bei dir. (Vorschau-Modus)'
                  : 'Wir melden uns in Kürze bei dir.'}
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              onSubmit={handleSubmit}
              noValidate
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <Field label="Name">
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Dein vollständiger Name"
                    style={{ ...inputBase, ...borderFor('name') }}
                  />
                </Field>

                <Field label="E-Mail">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="deine@email.com"
                    style={{ ...inputBase, ...borderFor('email') }}
                  />
                </Field>

                <Field label="Instagram Handle">
                  <input
                    type="text"
                    name="instagram"
                    required
                    value={form.instagram}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('instagram')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="@dein_profil"
                    style={{ ...inputBase, ...borderFor('instagram') }}
                  />
                </Field>

                <Field label="Wo bist du aktuell?">
                  <div style={{ position: 'relative' }}>
                    <select
                      name="level"
                      required
                      value={form.level}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('level')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputBase,
                        ...borderFor('level'),
                        color: form.level ? '#F5F5F2' : '#A5A5A5',
                        cursor: 'pointer',
                        paddingRight: '2.5rem',
                      }}
                    >
                      <option value="" disabled>
                        Bitte wählen
                      </option>
                      <option value="anfaenger">Anfänger</option>
                      <option value="wachstumsphase">Wachstumsphase</option>
                      <option value="etabliert">Etabliert</option>
                    </select>
                    <div
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#A5A5A5',
                        fontSize: '0.75rem',
                      }}
                    >
                      ▾
                    </div>
                  </div>
                </Field>

                <Field label="Was ist dein größtes Ziel als Creator?">
                  <textarea
                    name="goal"
                    required
                    rows={4}
                    value={form.goal}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('goal')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Beschreibe dein Ziel..."
                    style={{
                      ...inputBase,
                      ...borderFor('goal'),
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                  />
                </Field>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      name: 'ageConfirmed',
                      checked: form.ageConfirmed,
                      label: 'Ich bin 18 Jahre oder älter',
                    },
                    {
                      name: 'privacyConfirmed',
                      checked: form.privacyConfirmed,
                      label: 'Ich stimme der Datenschutzerklärung zu',
                    },
                  ].map(({ name, checked, label }) => (
                    <label
                      key={name}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
                        <input
                          type="checkbox"
                          name={name}
                          required
                          checked={checked}
                          onChange={handleChange}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#00D084',
                            cursor: 'pointer',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '0.9rem',
                          color: '#A5A5A5',
                          lineHeight: 1.5,
                        }}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                {status === 'error' && (
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.875rem',
                      color: '#ff6b6b',
                    }}
                  >
                    Bitte versuche es später erneut.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%',
                    backgroundColor: status === 'submitting' ? 'rgba(0,208,132,0.6)' : '#00D084',
                    color: '#050505',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.02em',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease, opacity 0.2s ease',
                    marginTop: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'submitting') {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        '#00bb75';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'submitting') {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        '#00D084';
                    }
                  }}
                >
                  {status === 'submitting' ? 'Wird gesendet…' : 'Jetzt bewerben'}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationFormSection;
