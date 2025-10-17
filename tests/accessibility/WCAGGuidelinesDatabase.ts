/**
 * WCAG 2.1/2.2 Guidelines Database
 * Comprehensive database of accessibility rules with detailed explanations,
 * remediation steps, and examples for creating actionable reports
 */

export interface WCAGRule {
    id: string;
    title: string;
    level: 'A' | 'AA' | 'AAA';
    principle: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
    guideline: string;
    description: string;
    explanation: string;
    impact: 'Critical' | 'Serious' | 'Moderate' | 'Minor';
    tags: string[];
    remediationSteps: string[];
    codeExamples: {
        bad: string;
        good: string;
        description: string;
    }[];
    testingMethods: string[];
    resources: string[];
    commonMistakes: string[];
    userImpact: string;
}

export interface WCAGCategory {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
}

export class WCAGGuidelinesDatabase {
    private static instance: WCAGGuidelinesDatabase;
    private rules: Map<string, WCAGRule> = new Map();
    private categories: Map<string, WCAGCategory> = new Map();

    private constructor() {
        this.initializeRules();
        this.initializeCategories();
    }

    public static getInstance(): WCAGGuidelinesDatabase {
        if (!WCAGGuidelinesDatabase.instance) {
            WCAGGuidelinesDatabase.instance = new WCAGGuidelinesDatabase();
        }
        return WCAGGuidelinesDatabase.instance;
    }

    private initializeCategories(): void {
        this.categories.set('perceivable', {
            id: 'perceivable',
            name: 'Perceivable',
            description: 'Information and UI components must be presentable to users in ways they can perceive',
            color: '#3498db',
            icon: '👁️'
        });

        this.categories.set('operable', {
            id: 'operable',
            name: 'Operable',
            description: 'UI components and navigation must be operable by all users',
            color: '#2ecc71',
            icon: '⌨️'
        });

        this.categories.set('understandable', {
            id: 'understandable',
            name: 'Understandable',
            description: 'Information and operation of UI must be understandable',
            color: '#f39c12',
            icon: '🧠'
        });

        this.categories.set('robust', {
            id: 'robust',
            name: 'Robust',
            description: 'Content must be robust enough to be interpreted by assistive technologies',
            color: '#9b59b6',
            icon: '🛡️'
        });
    }

    private initializeRules(): void {
        // Color Contrast Rules
        this.rules.set('color-contrast', {
            id: 'color-contrast',
            title: 'Color Contrast',
            level: 'AA',
            principle: 'Perceivable',
            guideline: '1.4.3 Contrast (Minimum)',
            description: 'Text and background colors must have sufficient contrast ratio',
            explanation: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. This ensures that people with moderately low vision can read the text without assistive technology.',
            impact: 'Serious',
            tags: ['color', 'contrast', 'vision', 'readability'],
            remediationSteps: [
                'Check the contrast ratio between text and background colors',
                'Use a contrast ratio of at least 4.5:1 for normal text',
                'Use a contrast ratio of at least 3:1 for large text (18pt or 14pt bold)',
                'Test with color contrast analyzers',
                'Consider users with color vision deficiencies'
            ],
            codeExamples: [
                {
                    bad: '<p style="color: #999; background: #fff;">Low contrast text</p>',
                    good: '<p style="color: #333; background: #fff;">High contrast text</p>',
                    description: 'Ensure sufficient color contrast between text and background'
                }
            ],
            testingMethods: [
                'Use browser developer tools contrast checker',
                'Use online contrast ratio calculators',
                'Test with screen readers',
                'Validate with automated accessibility testing tools'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 1.4.3',
                'WebAIM Color Contrast Checker',
                'Colour Contrast Analyser (CCA)'
            ],
            commonMistakes: [
                'Using only color to convey information',
                'Insufficient contrast on interactive elements',
                'Not testing with different color blindness types',
                'Overlooking contrast in hover/focus states'
            ],
            userImpact: 'Users with low vision, color blindness, or using devices in bright environments may not be able to read the content'
        });

        // Image Alt Text Rules
        this.rules.set('image-alt', {
            id: 'image-alt',
            title: 'Images must have alternative text',
            level: 'A',
            principle: 'Perceivable',
            guideline: '1.1.1 Non-text Content',
            description: 'All images must have appropriate alternative text or be marked as decorative',
            explanation: 'Images that convey information must have alternative text that serves the equivalent purpose. Decorative images should have empty alt attributes (alt="") to be ignored by screen readers.',
            impact: 'Critical',
            tags: ['images', 'alt-text', 'screen-readers', 'non-text-content'],
            remediationSteps: [
                'Add descriptive alt text to informative images',
                'Use alt="" for decorative images',
                'Include alt text that conveys the same information as the image',
                'Keep alt text concise but descriptive',
                'Avoid phrases like "image of" or "picture of"'
            ],
            codeExamples: [
                {
                    bad: '<img src="chart.png">',
                    good: '<img src="chart.png" alt="Sales increased 25% from January to March 2024">',
                    description: 'Provide meaningful alt text that describes the content and purpose'
                },
                {
                    bad: '<img src="decoration.png" alt="decorative border">',
                    good: '<img src="decoration.png" alt="">',
                    description: 'Use empty alt for purely decorative images'
                }
            ],
            testingMethods: [
                'Check all img elements have alt attributes',
                'Verify alt text is meaningful and descriptive',
                'Test with screen readers',
                'Use accessibility browser extensions'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 1.1.1',
                'WebAIM Alternative Text guide',
                'W3C Images Tutorial'
            ],
            commonMistakes: [
                'Missing alt attributes entirely',
                'Using filename as alt text',
                'Alt text that doesn\'t match image content',
                'Not marking decorative images properly'
            ],
            userImpact: 'Screen reader users cannot understand image content without proper alternative text'
        });

        // Form Labels Rules
        this.rules.set('label', {
            id: 'label',
            title: 'Form controls must have labels',
            level: 'A',
            principle: 'Perceivable',
            guideline: '1.3.1 Info and Relationships',
            description: 'All form controls must have properly associated labels',
            explanation: 'Form controls like input fields, checkboxes, and radio buttons must have labels that clearly describe their purpose. Labels must be programmatically associated with their controls.',
            impact: 'Critical',
            tags: ['forms', 'labels', 'input', 'accessibility'],
            remediationSteps: [
                'Add <label> elements for all form controls',
                'Use "for" attribute or wrap controls in labels',
                'Ensure label text is descriptive and clear',
                'Use aria-label or aria-labelledby when visual labels aren\'t possible',
                'Test that labels are properly associated'
            ],
            codeExamples: [
                {
                    bad: '<input type="text" placeholder="Enter your name">',
                    good: '<label for="name">Full Name:</label><input type="text" id="name" placeholder="Enter your name">',
                    description: 'Associate labels with form controls using for/id attributes'
                },
                {
                    bad: '<input type="checkbox"> I agree to terms',
                    good: '<label><input type="checkbox"> I agree to the terms and conditions</label>',
                    description: 'Wrap form controls and their labels together'
                }
            ],
            testingMethods: [
                'Check all form controls have associated labels',
                'Test with screen readers',
                'Use browser accessibility developer tools',
                'Validate HTML markup'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 1.3.1',
                'WebAIM Creating Accessible Forms',
                'W3C Forms Tutorial'
            ],
            commonMistakes: [
                'Using placeholder text instead of labels',
                'Labels not properly associated with controls',
                'Missing labels for complex form controls',
                'Using generic labels like "Click here"'
            ],
            userImpact: 'Screen reader users cannot understand the purpose of form controls without proper labels'
        });

        // Keyboard Navigation Rules
        this.rules.set('keyboard', {
            id: 'keyboard',
            title: 'Keyboard Accessible',
            level: 'A',
            principle: 'Operable',
            guideline: '2.1.1 Keyboard',
            description: 'All functionality must be available using only the keyboard',
            explanation: 'Users must be able to navigate and interact with all page content using only the keyboard. This includes custom interactive elements, not just standard form controls.',
            impact: 'Critical',
            tags: ['keyboard', 'navigation', 'interaction', 'focus'],
            remediationSteps: [
                'Ensure all interactive elements are keyboard accessible',
                'Provide visible focus indicators',
                'Implement logical tab order',
                'Add skip links for efficient navigation',
                'Test all functionality with keyboard only'
            ],
            codeExamples: [
                {
                    bad: '<div onclick="submitForm()">Submit</div>',
                    good: '<button type="submit" onclick="submitForm()">Submit</button>',
                    description: 'Use semantic HTML elements that are keyboard accessible by default'
                },
                {
                    bad: '<div role="button" onclick="doSomething()">Action</div>',
                    good: '<div role="button" tabindex="0" onclick="doSomething()" onkeydown="handleKeyDown(event)">Action</div>',
                    description: 'Add proper keyboard event handlers and tab index for custom interactive elements'
                }
            ],
            testingMethods: [
                'Navigate entire page using only keyboard',
                'Check Tab and Shift+Tab navigation order',
                'Test custom interactive elements with Enter/Space',
                'Verify focus indicators are visible'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 2.1.1',
                'WebAIM Keyboard Accessibility',
                'W3C Keyboard Navigation'
            ],
            commonMistakes: [
                'Missing keyboard event handlers on custom elements',
                'Poor or missing focus indicators',
                'Illogical tab order',
                'Keyboard traps without escape mechanism'
            ],
            userImpact: 'Users who cannot use a mouse rely entirely on keyboard navigation'
        });

        // Heading Structure Rules
        this.rules.set('heading-order', {
            id: 'heading-order',
            title: 'Heading levels should not be skipped',
            level: 'AA',
            principle: 'Perceivable',
            guideline: '1.3.1 Info and Relationships',
            description: 'Headings must follow a logical hierarchical order',
            explanation: 'Heading levels should not skip levels (e.g., h1 directly to h3). This helps screen reader users understand the content structure and navigate efficiently.',
            impact: 'Moderate',
            tags: ['headings', 'structure', 'hierarchy', 'navigation'],
            remediationSteps: [
                'Use heading levels in sequential order (h1, h2, h3, etc.)',
                'Don\'t skip heading levels',
                'Use only one h1 per page',
                'Structure headings to reflect content hierarchy',
                'Test heading structure with screen readers'
            ],
            codeExamples: [
                {
                    bad: '<h1>Title</h1><h3>Subsection</h3>',
                    good: '<h1>Title</h1><h2>Section</h2><h3>Subsection</h3>',
                    description: 'Use sequential heading levels without skipping'
                }
            ],
            testingMethods: [
                'Check heading structure using browser tools',
                'Use screen reader heading navigation',
                'Validate with accessibility testing tools',
                'Review content outline'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 1.3.1',
                'WebAIM Semantic Structure',
                'W3C Headings Tutorial'
            ],
            commonMistakes: [
                'Skipping heading levels for visual styling',
                'Multiple h1 elements on a page',
                'Using headings purely for styling',
                'Poor heading hierarchy'
            ],
            userImpact: 'Screen reader users rely on heading structure to understand and navigate content'
        });

        // Focus Management Rules
        this.rules.set('focus-visible', {
            id: 'focus-visible',
            title: 'Focus must be visible',
            level: 'AA',
            principle: 'Operable',
            guideline: '2.4.7 Focus Visible',
            description: 'Keyboard focus must be clearly visible',
            explanation: 'When users navigate with the keyboard, there must be a clear visual indication of which element has focus. This helps keyboard users understand where they are on the page.',
            impact: 'Serious',
            tags: ['focus', 'keyboard', 'visibility', 'navigation'],
            remediationSteps: [
                'Ensure all focusable elements have visible focus indicators',
                'Don\'t remove default focus outlines without providing alternatives',
                'Use high contrast colors for focus indicators',
                'Test focus visibility in different browsers',
                'Consider users with low vision'
            ],
            codeExamples: [
                {
                    bad: 'button:focus { outline: none; }',
                    good: 'button:focus { outline: 2px solid #005fcc; outline-offset: 2px; }',
                    description: 'Provide clear, high-contrast focus indicators'
                }
            ],
            testingMethods: [
                'Navigate with keyboard and check focus visibility',
                'Test in different browsers and operating systems',
                'Check focus indicators meet contrast requirements',
                'Test with high contrast mode'
            ],
            resources: [
                'WCAG 2.1 Success Criterion 2.4.7',
                'WebAIM Focus Indicators',
                'Focus Visible Specification'
            ],
            commonMistakes: [
                'Removing focus outlines without replacements',
                'Focus indicators too subtle or low contrast',
                'Inconsistent focus styling across elements',
                'Focus indicators that don\'t work in high contrast mode'
            ],
            userImpact: 'Keyboard users cannot navigate effectively without visible focus indicators'
        });
    }

    public getRule(ruleId: string): WCAGRule | undefined {
        return this.rules.get(ruleId);
    }

    public getAllRules(): WCAGRule[] {
        return Array.from(this.rules.values());
    }

    public getRulesByPrinciple(principle: string): WCAGRule[] {
        return Array.from(this.rules.values()).filter(rule => rule.principle === principle);
    }

    public getRulesByLevel(level: 'A' | 'AA' | 'AAA'): WCAGRule[] {
        return Array.from(this.rules.values()).filter(rule => rule.level === level);
    }

    public getRulesByImpact(impact: string): WCAGRule[] {
        return Array.from(this.rules.values()).filter(rule => rule.impact === impact);
    }

    public getCategory(categoryId: string): WCAGCategory | undefined {
        return this.categories.get(categoryId);
    }

    public getAllCategories(): WCAGCategory[] {
        return Array.from(this.categories.values());
    }

    public searchRules(query: string): WCAGRule[] {
        const lowercaseQuery = query.toLowerCase();
        return Array.from(this.rules.values()).filter(rule =>
            rule.title.toLowerCase().includes(lowercaseQuery) ||
            rule.description.toLowerCase().includes(lowercaseQuery) ||
            rule.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    }
}