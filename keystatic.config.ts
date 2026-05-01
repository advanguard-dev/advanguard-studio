import { config, collection, fields } from '@keystatic/core'

const isGithub = process.env.KEYSTATIC_STORAGE === 'github'

export default config({
  storage: isGithub
    ? { kind: 'github', repo: 'advanguard-dev/advanguard-studio' }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Advanguard CMS' },
  },

  collections: {
    services: collection({
      label: 'Services',
      slugField: 'num',
      path: 'content/services/*',
      format: { data: 'yaml' },
      schema: {
        num: fields.slug({ name: { label: 'ID (ex: branding)' } }),
        displayNum: fields.text({ label: 'Numéro affiché (ex: A / 01)' }),
        title: fields.text({ label: 'Titre' }),
        titleItalic: fields.text({ label: 'Partie en italique du titre' }),
        subtitle: fields.text({ label: 'Sous-titre' }),
        lede: fields.text({ label: 'Introduction', multiline: true }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (p) => p.value }
        ),
        metaTarif: fields.text({ label: 'Tarif' }),
        metaDelai: fields.text({ label: 'Délai' }),
        details: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre' }),
            content: fields.text({ label: 'Contenu', multiline: true }),
          }),
          { label: 'Ce qu\'on fait', itemLabel: (p) => p.fields.title.value }
        ),
        deliverables: fields.array(
          fields.text({ label: 'Livrable' }),
          { label: 'Livrables', itemLabel: (p) => p.value }
        ),
        prevSlug: fields.text({ label: 'Service précédent (slug)', validation: { isRequired: false } }),
        prevTitle: fields.text({ label: 'Service précédent (titre)', validation: { isRequired: false } }),
        nextSlug: fields.text({ label: 'Service suivant (slug)', validation: { isRequired: false } }),
        nextTitle: fields.text({ label: 'Service suivant (titre)', validation: { isRequired: false } }),
        seoTitle: fields.text({ label: 'SEO — Titre' }),
        seoDescription: fields.text({ label: 'SEO — Description', multiline: true }),
      },
    }),

    formations: collection({
      label: 'Formations',
      slugField: 'num',
      path: 'content/formations/*',
      format: { data: 'yaml' },
      schema: {
        num: fields.slug({ name: { label: 'ID (ex: ia)' } }),
        displayNum: fields.text({ label: 'Numéro affiché (ex: F / 01)' }),
        title: fields.text({ label: 'Titre' }),
        titleItalic: fields.text({ label: 'Partie en italique du titre' }),
        badge: fields.text({ label: 'Badge (Certifiante, Flagship…)' }),
        lede: fields.text({ label: 'Introduction', multiline: true }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (p) => p.value }
        ),
        programme: fields.array(
          fields.object({
            day: fields.text({ label: 'Jour (ex: J1)' }),
            content: fields.text({ label: 'Contenu', multiline: true }),
          }),
          { label: 'Programme', itemLabel: (p) => p.fields.day.value }
        ),
        outcomes: fields.array(
          fields.text({ label: 'Compétence' }),
          { label: 'Ce que vous saurez faire', itemLabel: (p) => p.value }
        ),
        metaFormat: fields.text({ label: 'Format' }),
        metaGroupe: fields.text({ label: 'Groupe' }),
        metaLieu: fields.text({ label: 'Lieu' }),
        metaTarif: fields.text({ label: 'Tarif' }),
        metaOffre: fields.text({ label: 'Offre spéciale', validation: { isRequired: false } }),
        seoTitle: fields.text({ label: 'SEO — Titre' }),
        seoDescription: fields.text({ label: 'SEO — Description', multiline: true }),
      },
    }),

    projets: collection({
      label: 'Projets',
      slugField: 'title',
      path: 'content/projets/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Titre du projet' } }),
        year: fields.text({ label: 'Année' }),
        client: fields.text({ label: 'Client', validation: { isRequired: false } }),
        description: fields.text({ label: 'Description courte', multiline: true }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (p) => p.value }
        ),
        featured: fields.checkbox({ label: 'Projet mis en avant', defaultValue: false }),
      },
    }),
  },
})
